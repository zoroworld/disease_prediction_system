from typing import TypedDict

from dotenv import load_dotenv
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
import os

load_dotenv()


_llm = None
_chat = None

def get_llm():
    global _llm
    if _llm is None:
        _llm =ChatGoogleGenerativeAI(
                    model="gemini-2.5-flash",
                    google_api_key=os.getenv("GEMINI_API_KEY")
                )
    return _llm




class SymptomState(TypedDict, total=False):
    input_text: str
    normalized_symptoms: str

def symptom_normalizer(state: SymptomState) -> SymptomState:
    prompt =  f"""
    You are a medical text normalizer.

    Task:
    Convert the user input into standardized medical symptoms.

    STRICT OUTPUT RULES:
    - Output ONLY a comma-separated list of symptom names
    - Do NOT include explanations, descriptions, or clarifications
    - Do NOT include parentheses (), brackets [], or extra words
    - Do NOT expand or interpret symptoms
    - Do NOT add examples or alternatives
    - If a symptom is ambiguous, choose the most common medical term
    - Output must contain ONLY symptom names and commas

    User input:
    {state['input_text']}

    Standardized symptoms:
    """
    response =  get_llm().invoke(prompt)

    return {
        "normalized_symptoms": response.content.strip().lower()
    }

graph = StateGraph(SymptomState)
graph.add_node("normalize", symptom_normalizer)
graph.set_entry_point("normalize")
graph.add_edge("normalize", END)

app = graph.compile()

def normalized_output(text: str) -> str:
    return app.invoke({"input_text": text})["normalized_symptoms"]


# data = normalized_output("fever headache body pain")
# print(data)