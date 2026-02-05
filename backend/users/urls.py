from django.contrib import admin
from django.urls import path
from .views import UserListAPIView, RegisterView, UserAPIView, MyTokenObtainPairView
from rest_framework_simplejwt.views import  TokenRefreshView

urlpatterns = [
    path('user/<int:id>/', UserAPIView.as_view(), name='user'),
    path('users/', UserListAPIView.as_view(), name='users'),
    path("login/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("signup/", RegisterView.as_view())
]