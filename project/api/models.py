from datetime import timedelta
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.dispatch import receiver
from django.db.models.signals import post_save

import datetime

class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    set_preferences = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        db_table = 'auth_user'

    def get_full_name(self):
        return self.first_name + " " + self.last_name


class Preferences(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    art = models.BooleanField(default=False)
    historical = models.BooleanField(default=False)
    activity = models.BooleanField(default=False)
    outdoors = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email

@receiver(post_save, sender=User)
def create_preferences(sender, instance, created, **kwargs):
   if created:
       Preferences.objects.create(
           user=instance,
       ) 
       print("Nice")

@receiver(post_save, sender=User)
def save_user_preferences(sender, instance, **kwargs):
    instance.preferences.save()


class Location(models.Model):
    name = models.CharField(max_length=250, unique=True)
    address = models.CharField(max_length=250)
    description = models.CharField(default="No Description Provided.", max_length=500)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    spot = models.ForeignKey("Spot", on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'spot')

    def __str__(self):
        return f"{self.user.get_full_name} bookmarked {self.spot.name}"

class LocationImage(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='location_images/')
    description = models.CharField(max_length=500, blank=True, null=True)

class Spot(Location):
    fees = models.PositiveIntegerField()
    expected_duration = models.DurationField(default=timedelta(hours=1))
    interested = models.ManyToManyField(User, through=Bookmark, related_name="bookmarks")
    opening_time = models.TimeField(default=datetime.time(8,0,0))
    closing_time = models.TimeField(default=datetime.time(20,0,0))

    def __str__(self):
        return self.name
        
class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Accomodation(Location):
    contact_number=models.CharField(max_length=11, blank=True, null=True)
    
    def __str__(self):
        return self.name

class FoodPlace(Location):
 
    def __str__(self):
        return self.name

class Itinerary(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    number_of_people = models.PositiveIntegerField(default=1)
    budget = models.FloatField(default=0)

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
    datetime_created = models.DateTimeField(auto_now_add=True)

class Ownership(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    approval_status = models.BooleanField(default=False)

    class Meta:
        unique_together = ('owner', 'location')

class Food(models.Model):
    location = models.ForeignKey(FoodPlace, on_delete=models.CASCADE)
    item = models.CharField(max_length=100)
    price = models.FloatField()
    image = models.ImageField(blank=True, null=True, upload_to='location_food/')