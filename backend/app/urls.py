from django.contrib import admin
from django.urls import path
from .views import index, UserListAPIView
from .views import DiseasePredictionAPIView, UserAPIView

urlpatterns = [
    path('predict-disease/', DiseasePredictionAPIView.as_view(), name='predict-disease'),
    path('user/', UserAPIView.as_view(), name='user'),
    path('users/', UserListAPIView.as_view(), name='users')
]
