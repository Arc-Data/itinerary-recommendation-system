from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name="register"),

    # provides a list of popular spots (6)
    path('popular/', popular_spots),
    path('create_itinerary/', create_itinerary, name='create_itinerary'),
    # provides a list of locations, fetching with additional parameters is possible
    path('location/', LocationViewSet.as_view({'get': 'list'}), name="locations"),
    path('plan/<int:itinerary_id>/', get_itinerary, name="itinerary"),
    path('location/<int:id>/', get_location, name='location-detail'),
    path('itineraries/', get_user_itineraries, name="itinerary-list"),
    path('day-item/', create_itinerary_item, name="create-itinerary-item"),
    path('day-item/<int:id>/delete', delete_day_item, name="delete-day-item"),
    path('update-ordering/', update_ordering, name="update-item-ordering"),
    # path('location/<int:pk>/', LocationDetailView.as_view(), name='location-detail')
    # provides a spot information given you send the id
    path('spot/<int:pk>/', spot),
]