from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name="register"),

    path('popular/', popular_spots),
    path('location/', LocationViewSet.as_view({'get': 'list'}), name="locations"),

    path('create_itinerary/', create_itinerary, name='create_itinerary'),
    path('plan/<int:itinerary_id>/', get_itinerary, name="itinerary"),
    path('plan/<int:itinerary_id>/calendar/', update_itinerary_calendar,name="update-itinerary-calendar"),
    
    path('location/<int:id>/', get_location, name='location-detail'),
    path('itineraries/', get_user_itineraries, name="itinerary-list"),
    path('day-item/', create_itinerary_item, name="create-itinerary-item"),
    path('day-item/<int:id>/delete', delete_day_item, name="delete-day-item"),
    path('update-ordering/', update_ordering, name="update-item-ordering"),

    path('spot/<int:pk>/', spot),

    path('preferences/', update_preferences, name="update-preferences"),
    path('recommendations/content/', get_content_recommendations, name='content-recommendations'),
]