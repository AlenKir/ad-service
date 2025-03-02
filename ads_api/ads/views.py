from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Ad
from .serializers import AdSerializer


@api_view(['GET'])
def get_ads(request):
    ads = Ad.objects.all()
    data = AdSerializer(ads, many=True).data
    return Response(data)
