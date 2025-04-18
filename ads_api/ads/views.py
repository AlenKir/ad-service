from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Ad
from .serializers import AdSerializer, AdCreateSerializer


class AdListView(generics.ListAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class AdDetailView(generics.RetrieveAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class AdCreateView(generics.CreateAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdCreateSerializer


class AdDeleteView(generics.DestroyAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer


class AdUpdateView(generics.UpdateAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdCreateSerializer
    parser_classes = [MultiPartParser, FormParser]
