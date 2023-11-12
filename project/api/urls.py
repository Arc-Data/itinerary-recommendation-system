from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name="register"),

    path('location/', LocationViewSet.as_view({'get': 'list'}), name="locations"),
    path('location/<int:id>/', get_location, name='location-detail'),
    path('location/<int:location_id>/add-bookmark/', add_bookmark, name='add_bookmark'),
    path('location/<int:location_id>/remove-bookmark/', remove_bookmark, name='remove_bookmark'),
    
    path('itinerary/',  create_itinerary, name='create_itinerary'),
    path('itinerary/list/', get_itinerary_list, name="itinerary-list"),
    path('itinerary/<int:itinerary_id>/', get_itinerary, name="get_itinerary"),
    path('itinerary/<int:itinerary_id>/calendar/', update_itinerary_calendar,name="update-itinerary-calendar"),
    path('itinerary/<int:itinerary_id>/days/', get_related_days, name="get_related_days"),
    path('itinerary/<int:itinerary_id>/delete/', delete_itinerary, name="delete_itinerary"),
    path('itinerary/<int:itinerary_id>/edit/name/', edit_itinerary_name, name="edit_itinerary"),

    path('day/<int:day_id>/color/', edit_day_color, name="edit-day-color"),
    path('day/<int:day_id>/delete/', delete_day, name="delete-day"),

    path('day-item/', create_itinerary_item, name="create-itinerary-item"),
    path('day-item/<int:day_id>/delete/', delete_day_item, name="delete-day-item"),
    path('update-ordering/', update_ordering, name="update-item-ordering"),

    path('spot/<int:pk>/', spot),

    path('preferences/', update_preferences, name="update-preferences"),
    
    path('recommendations/content/', get_content_recommendations, name='content-recommendations'),
    path('recommendations/<int:model_id>/apply/', apply_recommendation, name='apply-recommendation'),

    path('bookmarks/', get_bookmarks, name='get_bookmarks'),
]