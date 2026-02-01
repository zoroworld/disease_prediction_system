from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import HttpResponse

from users.models import User
from users.serializers import UserSerializer

from .serializers import (
    DiseasePredictionRequestSerializer,
    DiseasePredictionResponseSerializer
)

from .ml.predictor import predict_disease
from .ml.normalize import normalized_output

def index(request):
    return HttpResponse("Hello World")



class DiseasePredictionAPIView(APIView):

    def post(self, request):
        serializer = DiseasePredictionRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        raw_symptoms = serializer.validated_data["symptoms"]

        if not raw_symptoms:
            return Response(
                {"error": "symptoms field is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # {
        #     "symptoms": "fever headache body pain"
        # }

        # 1️⃣ Normalize (LangChain / LLM)
        normalized = normalized_output(raw_symptoms)




        # 2️ML Prediction
        predictions = predict_disease(raw_symptoms)

        # predictions = [
        #     {"disease": "Migraine", "confidence": 0.87},
        #     {"disease": "Viral Fever", "confidence": 0.09},
        # ]

        response_data = {
            "input_symptoms": raw_symptoms,
            "normalized_symptoms": normalized,
            "predictions": predictions,
        }

        return Response(
            DiseasePredictionResponseSerializer(response_data).data,
            status=status.HTTP_200_OK
        )


class UserListAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)  # ✅
        return Response(serializer.data)

class UserAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = UserSerializer(
            request.user,
            data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request):
        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True   # ✅ FIX
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




