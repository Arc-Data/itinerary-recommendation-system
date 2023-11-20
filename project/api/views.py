from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated

from .managers import *
from .models import *
from .serializers import *

import datetime
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
        query = self.request.query_params.get('query', None)
        hide = self.request.query_params.get('hide', None) 


        if query:
            queryset = queryset.filter(name__istartswith=query)

        if hide:
            queryset = queryset.filter(is_closed=False)

        return queryset
    
class CustomNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class PaginatedLocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationQuerySerializers
    filter_backends = [SearchFilter]
    search_fields = ['name']
    pagination_class = CustomNumberPagination

    action = {
        'list': 'list',
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('query', None)
        hide = self.request.query_params.get('hide', None) 


        if query:
            queryset = queryset.filter(name__istartswith=query)

        if hide:
            queryset = queryset.filter(is_closed=False)

        return queryset
    
@api_view(['GET'])
def get_related_days(request, itinerary_id):
    itinerary = Itinerary.objects.get(id=itinerary_id)

    days = Day.objects.filter(itinerary=itinerary)
    day_serializer = DaySerializers(days, many=True)

    return Response(day_serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_itinerary_list(request):
    user = request.user
    itineraries = Itinerary.objects.filter(user=user)
    serializer = ItineraryListSerializers(itineraries, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_itinerary(request, itinerary_id):
    try:
        itinerary = Itinerary.objects.get(id=itinerary_id)
    except Itinerary.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.user != itinerary.user:
        return Response({'message': "Access Denied"}, status=status.HTTP_403_FORBIDDEN)

    itinerary_serializer = ItinerarySerializers(itinerary)

    return Response(itinerary_serializer.data, status=status.HTTP_200_OK)

        

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_itinerary(request, itinerary_id):
    itinerary = Itinerary.objects.get(id=itinerary_id)

    if not itinerary:
        return Response(status=status.HTTP_404_NOT_FOUND)

    itinerary.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_ordering(request):
    items = request.data.get("items")
    print(items)

    for order, item in enumerate(items):
        itinerary_item = ItineraryItem.objects.get(id=item["id"])
        itinerary_item.order = order
        itinerary_item.save()

    return Response({'message': 'Ordering Updated Successfully'}, status=status.HTTP_200_OK)

@api_view(["PATCH"])
def edit_itinerary_name(request, itinerary_id):
    name = request.data.get("name")
    itinerary = Itinerary.objects.get(id=itinerary_id)
    itinerary.name = name
    itinerary.save()

    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_location(request, id):
    user = request.user
    try:
        location = Location.objects.get(pk=id)
    except Location.DoesNotExist:
        return Response({'error': 'Location not found'}, status=404)

    serializer = LocationSerializers(location, context={'user': user})
    data = serializer.data

    return Response(data)

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
        
        order = 1
        while current_date <= end_date:
            Day.objects.create(
                date=current_date,
                itinerary=itinerary,
                order=order
            )

            order = order + 1
            current_date += timedelta(days=1)
        
        return Response({'id': itinerary.id}, status=status.HTTP_201_CREATED)

    return Response(itinerary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_day_item(request, day_id):
    try:
        item = ItineraryItem.objects.get(pk=day_id)
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

@api_view(["POST"]) 
def apply_recommendation(request, model_id):
    day_id = request.data.get("day_id")
    day = Day.objects.get(id=day_id)

    ItineraryItem.objects.filter(day=day).delete()

    model = ModelItinerary.objects.get(id=model_id)

    items = []
    for idx, location in enumerate(model.locations.all()):
        item = ItineraryItem.objects.create(
            day=day,
            location=location,
            order=idx
        )
        items.append(item)

    day_serializer = DaySerializers(day)

    return Response({
        'message': 'Successfully applied recommendation',
        'day': day_serializer.data
        }, status=status.HTTP_200_OK)

@api_view(["POST"])
def edit_day_color(request, day_id):
    color = request.data.get("color")
    day = Day.objects.get(id=day_id)
    day.color = color
    day.save()

    day_serializer = DaySerializers(day)

    return Response({
        'message': "Updated Day Color Successfully",
        'day': day_serializer.data
        }, status=status.HTTP_200_OK)

@api_view(["DELETE"])
def delete_day(request, day_id):
    try:
        print("Im here")
        day = Day.objects.get(id=day_id)
        day.delete()
        return Response({
            'message': "Delete Success"
        }, status=status.HTTP_204_NO_CONTENT)
    except Day.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_location_reviews(request, location_id):
    user = request.user 
    if request.method == "GET":
        paginator = PageNumberPagination()
        paginator.page_size = 5

        reviews = Review.objects.filter(location_id=location_id).exclude(user=user)
        result_page = paginator.paginate_queryset(reviews, request)
        review_serializer = ReviewSerializers(result_page, many=True)
        
        return paginator.get_paginated_response(review_serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_review(request, location_id):
    if request.method == "GET":
        review = get_object_or_404(Review, location_id=location_id, user=request.user)
        review_serializer = ReviewSerializers(review)
        return Response(review_serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bookmarks(request):
    user = request.user
    if request.method == "GET":
        bookmarks = Bookmark.objects.filter(user=user)
        location_ids = bookmarks.values_list('spot__location_ptr', flat=True).distinct()
        bookmarked = Location.objects.filter(id__in=location_ids)
        serializer = RecentBookmarkSerializer(bookmarked, many=True, context={'bookmarks': bookmarks, 'user': user})
        data = serializer.data
        sorted_data = sorted(data, key=lambda x: x['datetime_created'], reverse=True)
        return Response(sorted_data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark(request, location_id):
    user = request.user
    spot = get_object_or_404(Spot, id=location_id)

    existing_bookmark = Bookmark.objects.filter(user=user, spot=spot).first()
    if existing_bookmark:
        existing_bookmark.delete()
        return Response({'message': 'Bookmark deleted.'}, status=status.HTTP_201_CREATED)

    else:
        bookmark = Bookmark(user=user, spot=spot)
        bookmark.save()
        return Response({'message': 'Bookmark added.'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_review(request, location_id):
    comment = request.data.get("comment")
    rating = request.data.get("rating")

    existing_review = Review.objects.filter(user=request.user, location_id=location_id).first()
    if existing_review:
        return Response({'error': 'Review already exists for this location and user.'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        review = Review.objects.create(
            user=request.user,
            location_id=location_id,
            comment=comment,
            rating=rating
        )
        return Response({'message': 'Review published.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': f'Error creating review: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_review(request, location_id):
    try:
        review = Review.objects.get(location_id=location_id, user=request.user)

        review.comment = request.data.get('comment', review.comment)
        review.rating = request.data.get('rating', review.rating)
        review.save()

        review_serializer = ReviewSerializers(instance=review)

        return Response({'message': "Updated Review Successfully", 'review': review_serializer.data}, status=status.HTTP_200_OK)
    except Review.DoesNotExist:
        return Response({'message': 'Review not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'message': f'Error updating review: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trip_bookmarks(request):
    user = request.user

    bookmarks = Bookmark.objects.filter(user=user)
    location_ids = bookmarks.values_list('spot__location_ptr', flat=True).distinct()
    bookmarked = Location.objects.filter(id__in=location_ids)

    serializer = BookmarkLocationSerializer(bookmarked, many=True, context={'bookmarks': bookmarks, 'user': user})
    data = serializer.data
    sorted_data = sorted(data, key=lambda x: x['datetime_created'], reverse=True)
    return Response(sorted_data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_review(request, location_id):
    try:
        review = Review.objects.get(location_id=location_id, user=request.user)
        review.delete()
        return Response({'message': 'Review deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Review.DoesNotExist:
        return Response({'message': 'Review not found.'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_location(request):
    type = request.data.get("type")
    name = request.data.get("name")
    address = request.data.get("address")
    latitude = request.data.get("latitude")
    longitude = request.data.get("longitude")
    description = request.data.get("description")
    image = request.data.get("image")

    location = Location.objects.create(
        name=name,
        address=address,
        latitude=latitude,
        longitude=longitude,
        description=description,
        location_type=type,
        is_closed=True
    )

    if image:
        LocationImage.objects.create(
            image=image,
            location=location,
            is_primary_image=True
        )

    serializer = LocationSerializers(location)
    data = serializer.data

    response_data = {
        'id': data['id'],
        'message': "Created successfully",
    }

    return Response(response_data, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_location(request, id):
    try:
        location = Location.objects.get(id=id)
        location.delete()   
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Location.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark(request, location_id):
    user = request.user
    spot = get_object_or_404(Spot, id=location_id)

    existing_bookmark = Bookmark.objects.filter(user=user, spot=spot).first()
    if existing_bookmark:
        existing_bookmark.delete()
        return Response({'message': 'Bookmark deleted.'}, status=status.HTTP_201_CREATED)

    else:
        bookmark = Bookmark(user=user, spot=spot)
        bookmark.save()
        return Response({'message': 'Bookmark added.'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trip_bookmarks(request):
    user = request.user

    bookmarks = Bookmark.objects.filter(user=user)
    location_ids = bookmarks.values_list('spot__location_ptr', flat=True).distinct()
    bookmarked = Location.objects.filter(id__in=location_ids)

    serializer = BookmarkLocationSerializer(bookmarked, many=True, context={'bookmarks': bookmarks, 'user': user})
    
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_location_recommendations(request, location_id):

    manager = RecommendationsManager()
    recommendation_ids = manager.get_location_recommendation(location_id)

    recommendations = []
    for id in recommendation_ids:
        recommendation = Location.objects.get(pk=id)
        recommendations.append(recommendation)

    recommendation_serializers = RecommendedLocationSerializer(recommendations, many=True)

    print (recommendation_serializers.data)
    return Response({
        'recommendations': recommendation_serializers.data
        }, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_homepage_recommendations(request):

    user = get_object_or_404(User, id=2)

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
    recommendation_ids = manager.get_homepage_recommendation(preferences)

    recommendations = []
    for id in recommendation_ids:
        recommendation = Location.objects.get(pk=id)
        recommendations.append(recommendation)

    recommendation_serializers = RecommendedLocationSerializer(recommendations, many=True)

    print (recommendation_serializers.data)
    return Response({
        'recommendations': recommendation_serializers.data
        }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializers(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.delete()   
        return Response(status=status.HTTP_204_NO_CONTENT)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user_serializer = UserSerializers(user)
        data = user_serializer.data
        return Response(data)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_ownership_request(request):
    user = request.user

    name = request.data.get('name')
    address = request.data.get('address')
    longitude = request.data.get('longitude')
    latitude = request.data.get('latitude')
    location_type = request.data.get('type')

    location = Location.objects.create(
        name=name,
        address=address,
        latitude=latitude,
        longitude=longitude,
        location_type=location_type
    )

    OwnershipRequest.objects.create(
        user=user,
        location=location
    )

    return Response(status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_ownership_requests(request):
    user = request.user
    requests = OwnershipRequest.objects.filter(user=user, is_approved=False)
    serializers = OwnershipRequestSerializer(requests, many=True)

    return Response(serializers.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_all_ownership_requests(request):
    requests = OwnershipRequest.objects.filter(is_approved=False)
    serializer = OwnershipRequestSerializer(requests, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def mark_day_as_completed(request, day_id):
    day = Day.objects.get(id=day_id)
    day.completed = False if day.completed else True
    day.save()

    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_completed_days(request):
    user = request.user
    itineraries = Itinerary.objects.filter(user=user)
    completed_days = []

    for itinerary in itineraries:
        days = Day.objects.filter(itinerary=itinerary)

        for day in days:
            if ItineraryItem.objects.filter(day=day).count() != 0:
                completed_days.append(day)

    serializer = DayRatingsSerializer(completed_days, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_completed_day(request, day_id):
    day = Day.objects.get(id=day_id)

    serializers = DayRatingSerializer(day)
    return Response(serializers.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
def mark_day_complete(request, day_id):
    day = Day.objects.get(id=day_id)
    day.completed = True
    day.save()

    serializer = DayRatingSerializer(day)
    return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['PATCH'])
def mark_days_complete(request):
    ids = request.data.get('ids')
    
    for id in ids:
        day = Day.objects.get(id=id)
        day.completed = True 
        day.save()

    return Response(status=status.HTTP_200_OK)

@api_view(["POST"])
def rate_day(request, day_id):
    rating = request.data

    day = Day.objects.get(id=day_id)
    day.rating = rating
    day.save()

    serializer = DayRatingSerializer(day)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_active_trips(request):
    user = request.user
    itineraries = Itinerary.objects.filter(user=user)
    current_date = datetime.datetime.now().date()

    days = []
    for itinerary in itineraries:
        matching_days = Day.objects.filter(itinerary=itinerary, date__lte=current_date, completed=False)
        matching_days = matching_days.annotate(num_items=Count('itineraryitem')).filter(num_items__gt=0)

        days.extend(matching_days)

    serializer = DayRatingsSerializer(days, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_business(request):
    user = request.user
    location = Location.objects.filter(owner=user)

    return Response(status=status.HTTP_200_OK)

@api_view(["PATCH"])
def approve_request(request, request_id):
    approval_request = OwnershipRequest(id=request_id)
    approval_request.is_approved=True
    approval_request.save()
    
    return Response(status=status.HTTP_200_OK)