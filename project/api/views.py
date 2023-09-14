from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, viewsets, filters
from rest_framework.filters import SearchFilter
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView

from .models import *
from .serializers import *

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserRegistrationView(CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializers
    filter_backends = [SearchFilter]
    search_fields = ['name']

    action = {
        'list': 'list',
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('query')

        if query:
            queryset = queryset.filter(name__istartswith=query)

        return queryset
     
@api_view(["GET"])
def popular_spots(request):
    if request.method == "GET":
        spot = Spot.objects.all()[:6]
        serializer = SpotPopularSerializers(spot, many=True)
        return Response(serializer.data)

@api_view(["GET"])
def location(request):
    if request.method == "GET":
        location = Location.objects.all()
        serializer = LocationSerializers(location, many=True)
        return Response(serializer.data)
    
@api_view(["GET"])
def spot(request, pk):
    if request.method == "GET":
        spot = get_object_or_404(Spot, id=pk)
        serializer = SpotDetailSerializers(spot)
        return Response(serializer.data)