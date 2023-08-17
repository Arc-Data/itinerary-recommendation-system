from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import *
from .serializers import *

# Create your views here.
@api_view(["GET"])
def popular_spots(request):
    if request.method == "GET":
        spot = Spot.objects.all()[:6]
        serializer = SpotSerializers(spot, many=True)
        return Response(serializer.data)