from datetime import timedelta
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

'''
how do i express difference in time schedules and sometimes varying fees
do i simply express fees as an estimation of expenses per person?

using JSON Fields in order to express 

class Location(models.Model):
    name = models.CharField(max_length=100)
    schedule = JSONField()

however, coming up with a model that is able to 
consider day breaks might again prove to be difficult but 
technically doable as well

makes me wonder, could itinerary items one by one be better 
rather than generating a complete itinerary
'''

class User(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    class Meta:
        db_table = 'auth_user'

class Location(models.Model):
    name = models.CharField(max_length=250, unique=True)
    address = models.CharField(max_length=250)
    description = models.CharField(default="No Description Provided.", max_length=500)
    latitude = models.FloatField()
    longitude = models.FloatField()
    image = models.ImageField(upload_to='location_images/', default='location_images/Background.jpg')

class Spot(Location):
    fees = models.PositiveIntegerField()
    expected_duration = models.DurationField(default=timedelta(hours=1))
    # opening_time = models.TimeField()
    # closing_time = models.TimeField()
    historical_relevance = models.PositiveIntegerField(default=1)
    art_focus = models.PositiveIntegerField(default=1)
    activity_focus = models.PositiveIntegerField(default=1)

class Accomodation(Location):
    pass

class FoodPlace(Location):
    # opening_time = models.TimeField()
    # closing_time = models.TimeField()
    pass

class Activity(Location):
    fees = models.PositiveIntegerField()

class Itinerary(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Day(models.Model):
    date = models.DateField()
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE)

class ItineraryItem(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)

class Review(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    comment = models.TextField()
    rating = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


