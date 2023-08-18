from django.urls import path
from .views import *

urlpatterns = [
    path('popular/', popular_spots),
    path('location/', location),
    path('spot/<int:pk>/', spot),
]