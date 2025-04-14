from django.urls import path
from .views import AdListView, AdDetailView, AdCreateView, AdDeleteView

urlpatterns = [
    path('ads/', AdListView.as_view(), name='ad_list'),
    path('ads/<int:pk>/', AdDetailView.as_view(), name='ad_detail'),
    path('ads/create/', AdCreateView.as_view(), name='ad_create'),
    path('ads/<int:pk>/delete/', AdDeleteView.as_view(), name='ad_delete'),
]
