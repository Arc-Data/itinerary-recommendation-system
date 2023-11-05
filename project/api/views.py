from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, viewsets
from rest_framework.filters import SearchFilter
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from .managers import *
from .models import *
from .serializers import *

import numpy as np

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
    serializer_class = LocationQuerySerializers
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

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_ordering(request):
    items = request.data.get("items")

    for order, item in enumerate(items):
        itinerary_item = ItineraryItem.objects.get(id=item["id"])
        itinerary_item.order = order
        itinerary_item.save()

    return Response({'message': 'Ordering Updated Successfully'}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_itinerary(request, itinerary_id):
    try:
        itinerary = Itinerary.objects.get(id=itinerary_id)
    except Itinerary.DoesNotExist:
        return Response(response_data, status=status.HTTP_404_NOT_FOUND)

    if request.user != itinerary.user:
        return Response({'message': "Access Denied"}, status=status.HTTP_403_FORBIDDEN)

    if request.method == "GET":
        try:
            itinerary_serializer = ItinerarySerializers(itinerary)

            days = Day.objects.filter(itinerary=itinerary)
            day_serializers = DaySerializers(days, many=True)  # Use many=True here

            response_data = {
                'itinerary': itinerary_serializer.data,
                'days': day_serializers.data
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
        print("valid")
        itinerary = itinerary_serializer.save()

        current_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
        end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()
        
        while current_date <= end_date:
            Day.objects.create(
                date=current_date,
                itinerary=itinerary
            )

            current_date += timedelta(days=1)
        
        return Response({'id': itinerary.id}, status=status.HTTP_201_CREATED)
    

    return Response(itinerary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_day_item(request, id):
    try:
        item = ItineraryItem.objects.get(pk=id)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ItineraryItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
def create_itinerary_item(request):
    day_id = request.data.get("day")
    location_id = request.data.get("location")
    order = request.data.get("order")

    try:
        location = Location.objects.get(pk=location_id)
    except Location.DoesNotExist:
        return Response({"error": "Location not found"}, status=status.HTTP_404_NOT_FOUND)

    itinerary_item = ItineraryItem.objects.create(day_id=day_id, location=location, order=order)
    serializer = ItineraryItemSerializer(itinerary_item)

    return Response(serializer.data, status=status.HTTP_201_CREATED)

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
        serializer = LocationQuerySerializers(location, many=True)
        return Response(serializer.data)
    
@api_view(["GET"])
def spot(request, pk):
    if request.method == "GET":
        spot = get_object_or_404(Spot, id=pk)
        serializer = SpotDetailSerializers(spot)
        return Response(serializer.data)

@api_view(["PATCH"]) 
@permission_classes([IsAuthenticated])
def update_preferences(request):
    user = request.user
    preferences = user.preferences

    preferences.art = request.data.get("Art")
    preferences.activity = request.data.get("Activity")
    preferences.culture = request.data.get("Culture")
    preferences.entertainment = request.data.get("Entertainment")
    preferences.history = request.data.get("History")
    preferences.nature = request.data.get("Nature")
    preferences.religion = request.data.get("Religion")

    preferences.save()

    user.set_preferences = True
    user.save()

    return Response({'message': "Preferences Updated Successfully"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_content_recommendations(request):
    user = request.user

    preferences = [
        user.preferences.history,
        user.preferences.nature,
        user.preferences.religion,
        user.preferences.art, 
        user.preferences.activity,
        user.preferences.entertainment,
        user.preferences.culture
    ]

    preferences = np.array(preferences, dtype=int)

    manager = RecommendationsManager()
    recommendation_ids = manager.get_content_recommendations(preferences)

    recommendations = []
    for id in recommendation_ids:
        recommendation = ModelItinerary.objects.get(pk=id)
        recommendations.append(recommendation)

    recommendation_serializers = ModelItinerarySerializers(recommendations, many=True)

    return Response({
        'recommendations': recommendation_serializers.data
        }, status=status.HTTP_200_OK)

@api_view(["POST"])
def update_itinerary_calendar(request, itinerary_id):
    start_date = request.data.get("startDate")
    end_date = request.data.get("endDate")

    itinerary = Itinerary.objects.get(pk=itinerary_id)
    Day.objects.filter(itinerary=itinerary).delete()

    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%dT%H:%M:%S.%fZ').date()
    end_date = datetime.datetime.strptime(end_date, '%Y-%m-%dT%H:%M:%S.%fZ').date()

    print(start_date, end_date)

    days = []

    while start_date <= end_date:
        day = Day.objects.create(
            date=start_date,
            itinerary=itinerary
        )

        days.append(day)

        start_date += timedelta(days=1)


    day_serializers = DaySerializers(days, many=True)

    return Response({
        'message': "Calendar Updated Successfully",
        'days': day_serializers.data
        }, status=status.HTTP_200_OK)
