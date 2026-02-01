from dotenv import load_dotenv
from typing import TypedDict
from langgraph.graph import StateGraph, END
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
import os

load_dotenv()

HF_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")

print("HF TOKEN LENGTH:", len(HF_TOKEN))

if not HF_TOKEN:
    raise RuntimeError("HUGGINGFACEHUB_API_TOKEN not found")



_llm = None
_chat = None

def get_llm():
    global _llm
    if _llm is None:
        _llm = HuggingFaceEndpoint(
            repo_id="HuggingFaceH4/zephyr-7b-beta",
            task="chat-completion",
            huggingfacehub_api_token=HF_TOKEN,
            temperature=0.3,
            max_new_tokens=256,
        )
    return _llm

def get_chat():
    global _chat
    if _chat is None:
        _chat = ChatHuggingFace(llm=get_llm())
    return _chat


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
    response =  get_chat().invoke(prompt)

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