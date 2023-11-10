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
    path('plan/<int:itinerary_id>/calendar/', update_itinerary_calendar,name="update-itinerary-calendar"),
    
    path('location/<int:id>/', get_location, name='location-detail'),
    path('itineraries/', get_user_itineraries, name="itinerary-list"),
    path('plan/<int:itinerary_id>/', get_itinerary, name="itinerary"),
    
    path('itinerary/<int:itinerary_id>/', get_itinerary_2, name="get_itinerary"),
    path('itinerary/<int:itinerary_id>/days/', get_related_days, name="get_related_days"),
    path('itinerary/<int:itinerary_id>/delete/', delete_itinerary, name="delete_itinerary"),

    path('day/<int:day_id>/color/', edit_day_color, name="edit-day-color"),
    path('day/<int:day_id>/delete/', delete_day, name="delete-day"),

    path('day-item/', create_itinerary_item, name="create-itinerary-item"),
    path('day-item/<int:day_id>/delete/', delete_day_item, name="delete-day-item"),
    path('update-ordering/', update_ordering, name="update-item-ordering"),

    path('spot/<int:pk>/', spot),

    path('preferences/', update_preferences, name="update-preferences"),
    path('recommendations/content/', get_content_recommendations, name='content-recommendations'),
    path('recommendations/<int:model_id>/apply/', apply_recommendation, name='apply-recommendation'),

    path('location/<int:location_id>/reviews/', get_location_reviews, name='get_location_reviews'),
    path('location/<int:location_id>/reviews/user/', get_user_review, name='get_user_review'),
    path('location/<int:location_id>/reviews/create/', create_review, name='create_review'),
    path('location/<int:location_id>/reviews/edit/<int:review_id>/', edit_review, name='edit_review'),
    path('location/<int:location_id>/reviews/delete/<int:review_id>/', delete_review, name='delete_review'),
]