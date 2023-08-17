from django.urls import path
from .views import *

urlpatterns = [
    path('popular/', popular_spots),
]