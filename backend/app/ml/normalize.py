from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from dotenv import load_dotenv
import os

load_dotenv()


# 0. Load model (HF Inference Endpoint)
llm = HuggingFaceEndpoint(
    repo_id="HuggingFaceH4/zephyr-7b-beta",
    temperature=0.3,
    max_new_tokens=128,
)

model = ChatHuggingFace(llm=llm)


# 1. Define state
class SymptomState(TypedDict, total=False):
    input_text: str
    normalized_symptoms: str


# 2. Define node
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

    response = model.invoke(prompt)
    result = response.content.strip().lower()

    # safety cleanup
    result = result.replace("standardized symptoms:", "").strip()

    return {
        "normalized_symptoms": result
    }


# 3. Build graph
graph = StateGraph(SymptomState,)
graph.add_node("normalize", symptom_normalizer)
graph.set_entry_point("normalize")
graph.add_edge("normalize", END)

app = graph.compile()

# 4. Run
def normalized_output(input_text):
    output = app.invoke({"input_text": input_text})
    return output.normalized_symptoms

