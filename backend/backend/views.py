from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "API is running",
        "endpoints": {
            "admin" : "/admin",
            "predict": "/api/v1/predict-disease/",
            "user": "/api/v1/user/",
            "users": "/api/v1/users/",
            "login": "/api/v1/login/",
            "signup": "/api/v1/signup/"
        }
    })