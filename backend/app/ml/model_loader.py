import joblib
import os
from django.conf import settings

MODEL_DIR = os.path.join(settings.BASE_DIR, "models")
model = joblib.load(os.path.join(MODEL_DIR, "ensemble_model.pkl"))
vectorizer = joblib.load(os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl"))

