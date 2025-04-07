from rest_framework import serializers
from .models import Ad, Photo


class AdSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%B %d, %Y, %I:%M %p")
    updated_at = serializers.DateTimeField(format="%B %d, %Y, %I:%M %p")

    class Meta:
        model = Ad
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['ad', 'image']


class AdCreateSerializer(serializers.ModelSerializer):
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Ad
        fields = ['title', 'descr', 'body', 'price', 'photos']

    def create(self, validated_data):
        request = self.context.get('request')
        photos = request.FILES.getlist('photos')
        ad = Ad.objects.create(**validated_data)
        for photo in photos:
            Photo.objects.create(ad=ad, image=photo)
        return ad
