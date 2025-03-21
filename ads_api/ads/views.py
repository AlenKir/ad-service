from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Ad
from .serializers import AdSerializer


@api_view(['GET'])
def get_ads(request):
    ads = Ad.objects.all()
    data = AdSerializer(ads, many=True).data
    return Response(data)


@api_view(['GET'])
def get_ad(request, pk):
    try:
        ad = Ad.objects.get(pk=pk)
        data = AdSerializer(ad).data
        return Response(data)
    except Ad.DoesNotExist:
        return Response({"error": "Ad not found"}, status=status.HTTP_404_NOT_FOUND)
