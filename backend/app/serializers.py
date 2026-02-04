from rest_framework import serializers
from users.models import PatientInput, PatientResult


class PatientInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientInput
        fields = "__all__"


class PatientResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientResult
        fields = "__all__"

class DiseasePredictionRequestSerializer(serializers.Serializer):
    symptoms = serializers.CharField(
        max_length=500,
        help_text="Enter symptoms in natural language"
    )

class PredictionSerializer(serializers.Serializer):
    disease = serializers.CharField()
    confidence = serializers.FloatField()

class DiseasePredictionResponseSerializer(serializers.Serializer):
    input_symptoms = serializers.CharField()
    normalized_symptoms = serializers.CharField()
    predictions = PredictionSerializer(many=True)
    report = serializers.JSONField(required=False)

