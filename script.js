const API_BASE_URL = "http://127.0.0.1:8000";

const form = document.getElementById("predict-form");
const submitBtn = document.getElementById("submit-btn");
const apiErrorBox = document.getElementById("api-error");
const boardBody = document.getElementById("board-body");

document.getElementById("year").textContent = new Date().getFullYear();

// Field definitions mirror the Pydantic model exactly (name, type, constraints)
const FIELD_RULES = {
  latitude: { type: "float", min: -90, max: 90, label: "Latitude" },
  longitude: { type: "float", min: -180, max: 180, label: "Longitude" },
  price: { type: "float", exclusiveMin: 0, label: "Price" },
  minimum_nights: { type: "int", min: 1, max: 365, label: "Minimum nights" },
  number_of_reviews: { type: "int", min: 0, label: "Number of reviews" },
  reviews_per_month: { type: "float", min: 0, label: "Reviews per month" },
  calculated_host_listings_count: { type: "int", min: 0, label: "Host's total listings" },
  availability_365: { type: "int", min: 0, max: 365, label: "Availability" },
  neighbourhood_group: { type: "string", label: "Borough" },
  neighbourhood: { type: "string", label: "Neighbourhood" },
};

function clearErrors() {
  Object.keys(FIELD_RULES).forEach((name) => {
    const el = document.getElementById(`err-${name}`);
    if (el) el.textContent = "";
  });
  apiErrorBox.hidden = true;
  apiErrorBox.textContent = "";
}

function showFieldError(name, message) {
  const el = document.getElementById(`err-${name}`);
  if (el) el.textContent = message;
}

function validateAndCollect() {
  const data = new FormData(form);
  const payload = {};
  let isValid = true;

  for (const [name, rule] of Object.entries(FIELD_RULES)) {
    const raw = (data.get(name) ?? "").toString().trim();

    if (raw === "") {
      showFieldError(name, `${rule.label} is required.`);
      isValid = false;
      continue;
    }

    if (rule.type === "string") {
      payload[name] = raw;
      continue;
    }

    const num = Number(raw);
    if (Number.isNaN(num)) {
      showFieldError(name, `${rule.label} must be a number.`);
      isValid = false;
      continue;
    }
    if (rule.type === "int" && !Number.isInteger(num)) {
      showFieldError(name, `${rule.label} must be a whole number.`);
      isValid = false;
      continue;
    }
    if (rule.min !== undefined && num < rule.min) {
      showFieldError(name, `${rule.label} must be ≥ ${rule.min}.`);
      isValid = false;
      continue;
    }
    if (rule.max !== undefined && num > rule.max) {
      showFieldError(name, `${rule.label} must be ≤ ${rule.max}.`);
      isValid = false;
      continue;
    }
    if (rule.exclusiveMin !== undefined && num <= rule.exclusiveMin) {
      showFieldError(name, `${rule.label} must be greater than ${rule.exclusiveMin}.`);
      isValid = false;
      continue;
    }

    payload[name] = num;
  }

  return { isValid, payload };
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.classList.toggle("loading", isLoading);
  if (isLoading) {
    submitBtn.classList.add("swiping");
    setTimeout(() => submitBtn.classList.remove("swiping"), 600);
  }
}

function renderPlaceholder(message) {
  boardBody.innerHTML = `<p class="board__placeholder">${message}</p>`;
}

function buildFlapChars(text) {
  return String(text)
    .split("")
    .map((char, i) => {
      const delay = (i * 0.045).toFixed(3);
      if (char === " ") {
        return `<span class="flap-char flap-char--space" style="animation-delay:${delay}s"> </span>`;
      }
      return `<span class="flap-char" style="animation-delay:${delay}s">${char}</span>`;
    })
    .join("");
}

function renderResult(result) {
  const roomType = result.Predicted_room_type;
  const probabilities = Array.isArray(result.Probability) ? result.Probability : [];
  const confidence = probabilities.length ? Math.max(...probabilities) : null;
  const maxIndex = probabilities.length ? probabilities.indexOf(confidence) : -1;

  let probsHtml = "";
  if (probabilities.length) {
    probsHtml = probabilities
      .map((p, i) => {
        const pct = (p * 100).toFixed(1);
        const isTop = i === maxIndex;
        return `
          <div class="prob-row">
            <div class="prob-row__top">
              <span>Class option ${i + 1}${isTop ? " (predicted)" : ""}</span>
              <span>${pct}%</span>
            </div>
            <div class="prob-track">
              <div class="prob-fill ${isTop ? "is-top" : ""}" data-target="${pct}" style="width:0%"></div>
            </div>
          </div>`;
      })
      .join("");
  }

  boardBody.innerHTML = `
    <div class="result-card">
      <p class="result-card__label">Predicted Room Type</p>
      <h3 class="result-card__type">${buildFlapChars(roomType)}</h3>
      ${
        confidence !== null
          ? `<p class="result-card__label">Prediction Probabilities</p>${probsHtml}`
          : ""
      }
    </div>
  `;

  // Trigger the width transition on the next frame so bars animate in.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      boardBody.querySelectorAll(".prob-fill").forEach((el) => {
        el.style.width = `${el.dataset.target}%`;
      });
    });
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  clearErrors();

  const { isValid, payload } = validateAndCollect();
  if (!isValid) {
    return;
  }

  setLoading(true);
  renderPlaceholder("Fetching prediction from the model…");

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}.`;
      try {
        const errorBody = await response.json();
        if (errorBody?.detail) {
          if (Array.isArray(errorBody.detail)) {
            message = errorBody.detail
              .map((d) => `${(d.loc || []).slice(-1)[0]}: ${d.msg}`)
              .join(" · ");
          } else {
            message = String(errorBody.detail);
          }
        }
      } catch (_) {
        // response body wasn't JSON — keep the generic message
      }
      throw new Error(message);
    }

    const result = await response.json();
    renderResult(result);
  } catch (err) {
    const isNetworkError = err instanceof TypeError;
    apiErrorBox.hidden = false;
    apiErrorBox.textContent = isNetworkError
      ? `Couldn't reach the API at ${API_BASE_URL}. Make sure the FastAPI server is running (uvicorn main:app --reload).`
      : err.message || "Something went wrong while predicting. Please try again.";
    renderPlaceholder("No prediction yet — fix the error above and try again.");
  } finally {
    setLoading(false);
  }
}

form.addEventListener("submit", handleSubmit);