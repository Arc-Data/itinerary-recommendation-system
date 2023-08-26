from datetime import timedelta
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

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
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        db_table = 'auth_user'

    def get_full_name(self):
        return self.first_name + " " + self.last_name

class Location(models.Model):
    name = models.CharField(max_length=250, unique=True)
    address = models.CharField(max_length=250)
    description = models.CharField(default="No Description Provided.", max_length=500)
    latitude = models.FloatField()
    longitude = models.FloatField()
    image = models.ImageField(upload_to='location_images/', default='location_images/Background.jpg')

    def __str__(self):
        return self.name

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    spot = models.ForeignKey("Spot", on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'spot')

    def __str__(self):
        return f"{self.user.get_full_name} bookmarked {self.spot.name}"

class Spot(Location):
    fees = models.PositiveIntegerField()
    expected_duration = models.DurationField(default=timedelta(hours=1))
    interested = models.ManyToManyField(User, through=Bookmark, related_name="bookmarks")
    # opening_time = models.TimeField()
    # closing_time = models.TimeField()

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Accomodation(Location):
    
    def __str__(self):
        return self.name

class FoodPlace(Location):
 
    def __str__(self):
        return self.name

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


