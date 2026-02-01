from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from dotenv import load_dotenv
import os

# 1️⃣ Load .env immediately
load_dotenv()

# 2️⃣ Singleton for HF token
class HfToken:
    _instance = None

    @classmethod
    def get_token(cls):
        if cls._instance is None:
            token = os.getenv("HUGGINGFACEHUB_API_TOKEN")
            if not token:
                raise RuntimeError("HUGGINGFACEHUB_API_TOKEN not found in environment")
            cls._instance = token
        return cls._instance

# 3️⃣ Lazy-loaded LLM singleton
_llm_instance = None
_model_instance = None

def get_llm():
    global _llm_instance
    if _llm_instance is None:
        _llm_instance = HuggingFaceEndpoint(
            repo_id="meta-llama/Meta-Llama-3-8B-Instruct",
            task="chat-completion",
            temperature=0.3,
            max_new_tokens=128,
            huggingfacehub_api_token=HfToken.get_token(),
        )
    return _llm_instance

def get_model():
    global _model_instance
    if _model_instance is None:
        _model_instance = ChatHuggingFace(llm=get_llm())
    return _model_instance

# 4️⃣ Define state
class SymptomState(TypedDict, total=False):
    input_text: str
    normalized_symptoms: str

# 5️⃣ Define node
def symptom_normalizer(state: SymptomState) -> SymptomState:
    text = state.get("input_text", "")

    prompt = (
        "You are a medical text normalization system.\n"
        "Task: Convert user input into standardized clinical symptom names.\n"
        "Rules:\n"
        "- Fix spelling mistakes\n"
        "- Use standard medical terminology\n"
        "- Output ONLY a comma-separated list\n"
        "- Do NOT add explanations or extra text\n\n"
        f"Input: {text}\n"
        "Output:"
    )

    model = get_model()
    response = model.invoke(prompt)
    result = response.content.strip().lower()

    # safety cleanup
    result = result.replace("standardized symptoms:", "").strip()

    return {"normalized_symptoms": result}

# 6️⃣ Build graph
graph = StateGraph(SymptomState)
graph.add_node("normalize", symptom_normalizer)
graph.set_entry_point("normalize")
graph.add_edge("normalize", END)

app = graph.compile()

# 7️⃣ Helper function
def normalized_output(input_text):
    output = app.invoke({"input_text": input_text})
    return output['normalized_symptoms']

# Example
# data = normalized_output("I have feaver and head pain")
# print(data)
