from django.shortcuts import render


# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import HttpResponse


from users.models import User, PatientInput, PatientResult
from users.serializers import UserSerializer


from .serializers import (
    DiseasePredictionRequestSerializer,
    DiseasePredictionResponseSerializer,
)

from .ml.predictor import predict_disease
from .ml.normalize import normalized_output
from .ml.report_genration import generate_medical_report



def index(request):
    return HttpResponse("Hello World")



class DiseasePredictionAPIView(APIView):
    def post(self, request):
        # 1️⃣ Validate input
        serializer = DiseasePredictionRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        raw_symptoms = serializer.validated_data.get("symptoms")

        # 2️⃣ Normalize symptoms
        try:
            normalized_symptoms = normalized_output(raw_symptoms)
        except Exception as e:
            return Response(
                {"error": f"Symptom normalization failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # 3️⃣ ML prediction
        try:
            predictions = predict_disease(normalized_symptoms)
        except Exception as e:
            return Response(
                {"error": f"Disease prediction failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # 4️⃣ Generate full medical report
        try:
            report = generate_medical_report(raw_symptoms, predictions, normalized_symptoms)
        except Exception as e:
            report = None  # optional, do not block response

        user = User.objects.get(id=2)
        # 5️⃣ Save input to DB
        patient_input = PatientInput.objects.create(
            user=user,
            raw_symptoms=raw_symptoms,
            normalized_symptoms=normalized_symptoms,
            report=report
        )

        # 6️⃣ Save predictions to DB
        for pred in predictions:
            PatientResult.objects.create(
                disease_name=pred.get("disease"),
                confidence_score=pred.get("confidence", 0),
                patient_input=patient_input
            )

        # 7️⃣ Prepare response
        response_data = {
            "input_symptoms": raw_symptoms,
            "normalized_symptoms": normalized_symptoms,
            "predictions": predictions,
            "report": report
        }

        response_serializer = DiseasePredictionResponseSerializer(response_data)

        return Response(response_serializer.data, status=status.HTTP_200_OK)



