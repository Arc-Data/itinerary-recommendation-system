from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name="register"),

    path('location/create/', create_location, name="create-location"),
    path('location/<int:id>/delete/', delete_location, name="delete-location"),
    path('location/request/', create_ownership_request, name="create_ownership_requests"),
    path('location/requests/', get_ownership_requests, name="get_ownership_requests"),

    path('location/paginated/', PaginatedLocationViewSet.as_view({'get': 'list'}, name="paginated_locations")),

    path('location/', LocationViewSet.as_view({'get': 'list'}), name="locations"),
    path('location/<int:id>/', get_location, name='location-detail'),
    path('location/<int:location_id>/bookmark/', bookmark, name='bookmark'),
    
    path('itinerary/',  create_itinerary, name='create_itinerary'),
    path('itinerary/list/', get_itinerary_list, name="itinerary-list"),
    path('itinerary/<int:itinerary_id>/', get_itinerary, name="get_itinerary"),
    path('itinerary/<int:itinerary_id>/calendar/', update_itinerary_calendar,name="update-itinerary-calendar"),
    path('itinerary/<int:itinerary_id>/days/', get_related_days, name="get_related_days"),
    path('itinerary/<int:itinerary_id>/delete/', delete_itinerary, name="delete_itinerary"),
    path('itinerary/<int:itinerary_id>/edit/name/', edit_itinerary_name, name="edit_itinerary"),

    path('day/<int:day_id>/color/', edit_day_color, name="edit-day-color"),
    path('day/<int:day_id>/delete/', delete_day, name="delete-day"),
    path('days/completed/', get_completed_days, name="get_completed_days"),
    path('day/<int:day_id>/complete/', mark_day_complete, name="mark_day_complete"),
    path('day/<int:day_id>/detail/', get_completed_day, name="get-completed-day"),
    path('day/<int:day_id>/rate/', rate_day, name="rate-day"),
    path('days/complete/', mark_days_complete, name="mark_days_complete"),

    path('day-item/', create_itinerary_item, name="create-itinerary-item"),
    path('day-item/<int:day_id>/delete/', delete_day_item, name="delete-day-item"),
    path('update-ordering/', update_ordering, name="update-item-ordering"),

    path('spot/<int:pk>/', spot),

    path('preferences/', update_preferences, name="update-preferences"),
    
    path('recommendations/content/', get_content_recommendations, name='content-recommendations'),
    path('recommendations/<int:model_id>/apply/', apply_recommendation, name='apply-recommendation'),
    path('recommendations/location/<int:location_id>/', get_location_recommendations, name='get_location_recommendation'),
    path('recommendations/homepage/', get_homepage_recommendations, name='get_homepage_recommendations'), 

    path('bookmarks/', get_bookmarks, name='get_bookmarks'),
    path('trip-bookmarks/', trip_bookmarks, name='trip_bookmarks'),

    path('location/<int:location_id>/reviews/', get_location_reviews, name='get_location_reviews'),
    path('location/<int:location_id>/reviews/user/', get_user_review, name='get_user_review'),
    path('location/<int:location_id>/reviews/create/', create_review, name='create_review'),
    path('location/<int:location_id>/reviews/edit/', edit_review, name='edit_review'),
    path('location/<int:location_id>/reviews/delete/', delete_review, name='delete_review'),

    path('user/<int:user_id>/delete/', delete_user, name='delete_user'),
    path('user/', get_all_users, name='get_all_users'),
    path('user/<int:user_id>/', get_user, name='get_user'),
    path('user/active/', get_active_trips, name="get-active-trips"),
    
    path('requests/', get_all_ownership_requests, name="get_all_ownership_requests"),
    path('request/<int:request_id>/approve', approve_request, name="approve-request")
]