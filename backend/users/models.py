from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # custom fields (optional)
    phone = models.CharField(max_length=15, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True)
    role = models.CharField(
        max_length=20,
        choices=(
            ("patient", "Patient"),
            ("doctor", "Doctor"),
            ("admin", "Admin"),
        ),
        default="patient",
    )

    def __str__(self):
        return self.username


class PatientInput(models.Model):
    raw_symptoms = models.TextField()
    normalized_symptoms = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.normalized_symptoms


class PatientResult(models.Model):
    disease_name = models.TextField()
    confidence_score = models.FloatField()
    patient_input = models.ForeignKey(PatientInput, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.disease_name


