from django.contrib import admin
from django.urls import path
from .views import DiseasePredictionAPIView

urlpatterns = [
    path('predict-disease/', DiseasePredictionAPIView.as_view(), name='predict-disease'),
]
