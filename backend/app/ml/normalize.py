from langchain.llms import HuggingFacePipeline

llm = HuggingFacePipeline.from_model_id(
    model_id="google/flan-t5-small",
    task="text2text-generation"
)

def normalize_symptoms(text):
    prompt = f"""
    Convert this into standard medical symptoms:
    {text}
    """
    return llm(prompt).lower()
