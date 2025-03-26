from django.urls import path
from .views import get_ads, get_ad, create_ad

urlpatterns = [
    path('ads/', get_ads, name='get_ads'),
    path('ads/<int:pk>/', get_ad, name='get_ad'),
    path('ads/create/', create_ad, name='create_ad'),
]
