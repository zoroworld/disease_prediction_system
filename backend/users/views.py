from django.http import HttpResponse
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView


from .models import User
from .serializers import (
    RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer,

)


class UserListAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)  # ✅
        return Response(serializer.data)

class UserAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, id=None):
        try:
            if id:
                return User.objects.get(id=id)
            return self.request.user
        except User.DoesNotExist:
            raise ValueError("User not found")

    def get(self, request, id=None):
            user = self.get_object(id)
            serializer = UserSerializer(user, context={"request": request})
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)


    def put(self, request, id=None):
            user = self.get_object(id)
            serializer = UserSerializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)


    def patch(self, request, id=None):

            user = self.get_object(id)
            serializer = UserSerializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"success": True, "data": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, id=None):

            user = self.get_object(id)
            user.delete()
            return Response({"success": True, "message": "User deleted"}, status=status.HTTP_204_NO_CONTENT)




class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data = {
            "username": request.data.get("username"),
            "email": request.data.get("email"),
        }
        return Response(
            {"message": "User created successfully", "data":data},
            status=status.HTTP_201_CREATED
        )

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer