from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Ad
from .serializers import AdSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json


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


@csrf_exempt
@require_POST
def create_ad(request):
    try:
        data = json.loads(request.body)
        title = data.get("title")
        descr = data.get("descr")
        body = data.get("body", "")
        price = data.get("price")

        ad = Ad.objects.create(
            title=title,
            descr=descr,
            body=body,
            price=price
        )

        return JsonResponse({
            "id": ad.id,
            "title": ad.title,
            "descr": ad.descr,
            "body": ad.body,
            "price": ad.price
        }, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)