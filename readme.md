# Disease Prediction System  
**AI-Assisted Medical Report Generation**

---

##  Overview

The **Disease Prediction System** is a backend-driven application that accepts patient symptoms, predicts possible diseases using a machine learning model, and generates a **structured medical report** in JSON format By backend.

The system is built using **Django + Django REST Framework**, integrates an ML inference layer, and stores prediction results in **PostgreSQL using JSONField** for flexibility and extensibility.

**Disclaimer**: This project is intended for educational and decision-support purposes only and does **not** provide medical diagnosis or treatment advice.

---

# Class Diagram

1. User

        - username
        - email
        - password
        - is_staff
        - is_active
        - phone
        - age
        - role (patient / doctor / admin)

2. Patient Input

        - raw_symptoms
        - normalized_symptoms
        - user
        - report (JSON)
        - created_at
        - updated_at

3. PredictionResult

        - disease_name
        - confidence_score
        - patientInput 
        - created_at
        - updated_at

Relationships:

    User → PatientInput: Aggregation
    PatientInput → PredictionResult: Aggregation
    PredictionResult → PatientInput: Association

# Database Schema diagram

Users

    - id  
    - username  
    - email  
    - password  
    - is_staff  
    - is_active  
    - phone
    - age
    - role 

Patient_Input

    - id
    - raw_symptoms
    - normalized_symptoms
    - user_id
    - report (JSON)
    - created_at
    - updated_at

Prediction_Result

    - id
    - disease_name
    - confidence_score
    - patient_input_id 
    - created_at
    - updated_at

Foreign Keys:

    - Patient_Input(user_id) refers Users(id)
    - Prediction_Result(input_id) refers Patient_Inpu  (input_id)

Cardinality of Relations: 

    - Between Users and Patient_Input -> 1 : m
    - Between Patient_Input and Prediction_Result -> 1 : m



# API DESIGN


| API Endpoint                     | Method | Work Description                          |
|----------------------------------|--------|--------------------------------------------|
| `/`                              | GET    | Check API status (Health Check)            |
| `/admin`                         | GET    | Admin panel access                        |
| `/api/v1/predict-disease/`       | POST   | Predict disease based on symptoms         |
| `/api/v1/user/`                  | GET    | Get authenticated user details            |
| `/api/v1/users/`                 | GET    | Get list of all users (Admin only)        |
| `/api/v1/login/`                 | POST   | Authenticate user and return JWT token    |
| `/api/v1/signup/`                | POST   | Register a new user                       |




# Architecture

## System Overview

The application follows a containerized microservice-based architecture where the frontend and backend are independently developed, Dockerized, and deployed on cloud platforms.



## Architecture Components

| Component        | Technology Used        | Deployment Platform |
|------------------|------------------------|---------------------|
| Frontend         | React.js               | Render              |
| Backend          | Django Rest Framework  | vercel              |
| Database         | PostgreSQL             | Neon (Serverless)   |
| Containerization | Docker                 | Used for both FE & BE |


## Architecture Flow

1. The **React Frontend** runs inside a Docker container.
2. The frontend communicates with the **Backend REST APIs** over HTTPS.
3. The **Backend** is also Dockerized and deployed on Render.
4. The backend connects securely to **PostgreSQL (Neon cloud database)**.
5. Authentication is handled via JWT.
6. All services are deployed independently for scalability and maintainability.


## Containerization

Both frontend and backend services are containerized using Docker:

- Ensures consistent development and production environments.
- Simplifies deployment on Render.
- Enables scalability and portability.


## Cloud Deployment

- **Frontend:** Deployed on Render as a Web Service.
- **Backend:** Deployed on Render using Docker container.
- **Database:** Neon PostgreSQL (serverless, managed cloud database).



# Test the  site 

1. click https://disease-prediction-system-olive.vercel.app/


2. give password

        {
        "username": "shiva",
        "password": "password123"
        }

3. wait a 2-5 minute render take time

4. after give the symptoms input only.



