from django.urls import path
from .views import get_ads

urlpatterns = [
    path('ads/', get_ads, name='get_ads')
]
