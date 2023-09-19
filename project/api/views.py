from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, viewsets, filters
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_itineraries(request):
    user = request.user
    itineraries = Itinerary.objects.filter(user=user)
    serializer = ItineraryListSerializers(itineraries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_location(request, id):
    try:
        location = Location.objects.get(pk=id)
    except Location.DoesNotExist:
        return Response({'error': 'Location not found'}, status=404)
  
    serializer = LocationSerializers(location)
  
    
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_itinerary(request):
    start_date = request.data.get('start_date') 
    end_date = request.data.get('end_date')  

    itinerary_data = {
        'user': request.user.id,  
        'number_of_people': request.data.get('number_of_people', 1),
        'budget': request.data.get('budget', 0),
    }
    itinerary_serializer = ItinerarySerializers(data=itinerary_data)

    if itinerary_serializer.is_valid():
        itinerary = itinerary_serializer.save()

        current_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
        end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()
        
        while current_date <= end_date:
            day_data = {
                'date': current_date,
                'itinerary': itinerary.id,
            }
            day_serializer = DaySerializers(data=day_data)

            if day_serializer.is_valid():
                day_serializer.save()
            else:
                return Response(day_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            current_date += timedelta(days=1)
        
        return Response({'id': itinerary.id}, status=status.HTTP_201_CREATED)

    return Response(itinerary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_itinerary(request, itinerary_id):
    if request.method == "GET":
        try:
            itinerary = Itinerary.objects.get(id=itinerary_id, user=request.user)
            itinerary_serializer = ItinerarySerializers(itinerary)

            day = Day.objects.filter(itinerary=itinerary)
            day_serializers = DaySerializers(day, many=True)

            response_data = {
                'itinerary': itinerary_serializer.data,
                'days': day_serializers.data
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Itinerary.DoesNotExist:
            return Response({'message': 'Itinerary not found'}, status=status.HTTP_404_NOT_FOUND)

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