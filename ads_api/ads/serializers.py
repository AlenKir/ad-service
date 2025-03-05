from rest_framework import serializers
from .models import Ad


class AdSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%B %d, %Y, %I:%M %p")
    updated_at = serializers.DateTimeField(format="%B %d, %Y, %I:%M %p")

    class Meta:
        model = Ad
        fields = '__all__'
