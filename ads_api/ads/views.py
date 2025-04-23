from rest_framework import generics, filters
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Ad
from .serializers import AdSerializer, AdCreateSerializer


class AdListView(generics.ListAPIView):
    queryset = Ad.objects.all()
    serializer_class = AdSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'descr', 'body']
    ordering_fields = ['created_at', 'updated_at', 'price', 'title']
    ordering = ['-updated_at']


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
