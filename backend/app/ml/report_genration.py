from typing import TypedDict, List
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI


load_dotenv()

_llm = None

def get_llm():
    global _llm
    if _llm is None:
        _llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=os.getenv("GEMINI_API_KEY_1")
        )
    return _llm

# --- Report Generation ---

def generate_medical_report(input_symptoms: str, predictions: List[dict],  normalized_symptoms) -> dict:

    # Create overview and description prompt
    prompt = f"""
    You are a medical report generator.

    Task:
    Using the input symptoms and predictions, generate a structured JSON medical analysis report. You should:
    1. Summarize the symptoms clearly.
    2. Explain possible causes and medical context.
    3. Analyze model predictions and validate if they align with the symptoms; adjust if necessary.
    4. Provide step-by-step recommended actions in an array, including whether the patient should see a doctor.


    STRICT OUTPUT FORMAT:
    {{
        "overview": string,  # short summary of symptoms
        "description": string,  # medical explanation of symptoms
        "predictions": [{{"disease": string, "confidence": float, "recommendation": string}}],
         "recommended_steps": [  # array of actionable steps
            string,  # step 1
            string,  # step 2
            string,  # step 3, etc.
         ]
    }}

    Input symptoms: {input_symptoms}
    Normalized symptoms: {normalized_symptoms}
    Model predictions: {predictions}

    JSON Report:
    """
    response = get_llm().invoke(prompt)
    return response.content.strip()