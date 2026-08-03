# 🏠 NYC Airbnb Room Type Classification

A full-stack **Machine Learning** web application that predicts the **Airbnb Room Type** based on listing details such as location, pricing, availability, neighbourhood, and review statistics. Built with **Python, Scikit-learn, FastAPI, HTML, CSS, and JavaScript**.

---

## 📌 Project Overview

Choosing the right Airbnb room type is influenced by various listing characteristics, including **price, location, availability, neighbourhood, host information, and customer reviews**. This project leverages a Machine Learning model to analyze these features and accurately predict the **Room Type** of an Airbnb listing.

The application features a **FastAPI-powered REST API** connected to a responsive frontend, enabling users to enter listing information and receive instant predictions through an intuitive web interface.

---

## 🚀 Features

* 🏠 Machine Learning-based Room Type Prediction
* ⚡ FastAPI REST API Backend
* 🎨 Modern & Responsive User Interface
* 📍 Location-Based Analysis
* 💰 Price & Availability Analysis
* ⭐ Review & Host Information Analysis
* 🔄 Real-Time API Integration
* 📊 Instant Prediction Results
* 🌐 Easy Deployment on Render

---

## 🛠️ Tech Stack

### Machine Learning

* Python
* Scikit-learn
* Pandas
* NumPy
* Joblib

### Backend

* FastAPI
* Uvicorn
* Pydantic

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)

---

## 📂 Dataset Features

The model predicts the **Airbnb Room Type** using the following features:

| Feature | Description |
| -------- | ----------- |
| Latitude | Latitude of the property |
| Longitude | Longitude of the property |
| Price | Price per night |
| Minimum Nights | Minimum booking duration |
| Number of Reviews | Total number of reviews |
| Reviews Per Month | Average monthly reviews |
| Calculated Host Listings Count | Number of listings by the host |
| Availability 365 | Available booking days in a year |
| Neighbourhood Group | Borough of the property |
| Neighbourhood | Specific neighbourhood |

### **Target:** Room_Type

Predicted Room Types include:

- 🏠 Entire Home / Apartment
- 🚪 Private Room
- 👥 Shared Room
- 🏨 Hotel Room *(if available in the dataset)*

---

## 📁 Project Structure

```text
NYC-Airbnb-Room-Type-Classification/
│
├── index.html
├── style.css
├── script.js
├── main.py
├── Model_Pipeline.pkl
├── NYC_Airbnb_Room_Type_Classification.ipynb
├── requirements.txt
├── README.md
└── .gitignore
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Ankit-Singh-AI/Airbnb-Room-Type-Prediction-System.git
```

### 2. Navigate to the Project Directory

```bash
cd NYC-Airbnb-Room-Type-Classification
```

### 3. Create a Virtual Environment

**Windows**

```bash
python -m venv .venv
```

**macOS / Linux**

```bash
python3 -m venv .venv
```

### 4. Activate the Virtual Environment

**Windows (PowerShell)**

```bash
.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt)**

```bash
.venv\Scripts\activate
```

**macOS / Linux**

```bash
source .venv/bin/activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 6. Run the Application

#### Start the FastAPI Backend

```bash
uvicorn main:app --reload
```

Backend API

```text
http://127.0.0.1:8000
```

Swagger Documentation

```text
http://127.0.0.1:8000/docs
```

#### Start the Frontend

Open **index.html** in your browser or run it using the **Live Server** extension in Visual Studio Code.

---

## 💻 Application Workflow

1. Open the web application.
2. Enter Airbnb listing details.
3. Fill in pricing and availability information.
4. Select neighbourhood details.
5. Submit the prediction request.
6. FastAPI processes the input.
7. The trained Machine Learning model predicts the Room Type.
8. The predicted Room Type is displayed instantly.

---

## 📊 Model Input Features

* Latitude
* Longitude
* Price
* Minimum Nights
* Number of Reviews
* Reviews Per Month
* Calculated Host Listings Count
* Availability 365
* Neighbourhood Group
* Neighbourhood

### Output

* Airbnb Room Type

---

## 🔮 Future Improvements

* Interactive Map Integration
* Price Estimation Feature
* Listing Recommendation System
* Explainable AI (SHAP)
* Batch Predictions
* Cloud Deployment
* Mobile-Friendly Enhancements

---

## 📬 Connect with Me

* 💼 LinkedIn: https://www.linkedin.com/in/ankit-singh-35815333b/
* 🐙 GitHub: https://github.com/Ankit-Singh-AI
* 📧 Email: ankitsinghssps@gmail.com

---

