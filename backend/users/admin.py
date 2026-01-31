from django.contrib import admin
from .models import User, PatientInput, PatientResult

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "password" , "role", "is_staff")
    search_fields = ("username", "email")

@admin.register(PatientInput)
class PatientInputAdmin(admin.ModelAdmin):
    list_display = ("raw_symptoms", "normalized_symptoms", "created_at")
    search_fields = ("raw_symptoms", "normalized_symptoms")
    list_filter = ("created_at",)
    ordering = ("-created_at",)


@admin.register(PatientResult)
class PatientResultAdmin(admin.ModelAdmin):
    list_display = ("disease_name", "confidence_score", "patient_input", "created_at")
    search_fields = ("disease_name",)
    list_filter = ("created_at",)
    ordering = ("-created_at",)
