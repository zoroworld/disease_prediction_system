import numpy as np
from .model_loader import model, vectorizer

def predict_disease(symptoms_text, top_k=2):
    """
    symptoms_text: string
    returns: list of {disease, confidence}
    """

    # 1. Vectorize text
    X = vectorizer.transform([symptoms_text])

    # 2. Predict probabilities
    probs = model.predict_proba(X)[0]

    # 3. Class labels
    classes = model.classes_

    # 4. Top K predictions
    top_indices = np.argsort(probs)[::-1][:top_k]

    results = []
    for idx in top_indices:
        results.append({
            "disease": classes[idx],
            "confidence": round(float(probs[idx]), 2)
        })

    return results
