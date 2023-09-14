from datetime import timedelta
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from .managers import CustomUserManager

import datetime
import os

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

class Location(models.Model):
    name = models.CharField(max_length=250, unique=True)
    address = models.CharField(max_length=250)
    description = models.CharField(default="No Description Provided.", max_length=500)
    latitude = models.FloatField()
    longitude = models.FloatField()
    location_type = models.CharField(
        max_length=1,
        choices=[
            ('1', 'Spot'),
            ('2', 'FoodPlace'),
            ('3', 'Accommodation'),
        ],
        default=1
    )
    is_closed = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.location_type == '1':
            spot = Spot(location_ptr=self)
            spot.__dict__.update(self.__dict__)
            spot.save()
        elif self.location_type == '2':
            foodplace = FoodPlace(location_ptr=self)
            foodplace.__dict__.update(self.__dict__)
            foodplace.save()
        elif self.location_type == '3':
            accommodation = Accommodation(location_ptr=self)
            accommodation.__dict__.update(self.__dict__)
            accommodation.save()

    def __str__(self):
        return self.name
    
class CustomFee(models.Model):
    spot = models.ForeignKey("Spot", on_delete=models.CASCADE)
    min_cost = models.FloatField()
    max_cost = models.FloatField()

    def save(self, *args, **kwargs):
        if self.min_cost >= self.max_cost:
            raise ValueError("min_cost must be less than max_cost.")
        
        super().save(*args, **kwargs)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    spot = models.ForeignKey("Spot", on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'spot')

    def __str__(self):
        return f"{self.user.get_full_name} bookmarked {self.spot.name}"

def location_image_path(instance, filename):
    ext = filename.split('.')[-1]
    folder_name = instance.location.name.replace(" ", "_")
    filename = f"{instance.location.name}.{ext}"
    return os.path.join('location_images', folder_name, filename)


class LocationImage(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=location_image_path, default='location_images/Background.jpg')
    is_primary_image = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.location.name}"

class Spot(Location):
    fees = models.PositiveIntegerField()
    expected_duration = models.DurationField(default=timedelta(hours=1))
    interested = models.ManyToManyField(User, through=Bookmark, related_name="bookmarks")
    opening_time = models.TimeField(blank=True, null=True)
    closing_time = models.TimeField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.location_type = '1'
        super(Spot, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
        
class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class FoodPlace(Location):
 
    def save(self, *args, **kwargs):
        self.location_type = '2'
        super(FoodPlace, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class Accommodation(Location):
    contact_number=models.CharField(max_length=11, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.location_type = '3'
        super(FoodPlace, self).save(*args, **kwargs)

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


@receiver(post_save, sender=Location)
@receiver(post_save, sender=Spot)
def create_locationimage(sender, instance, created, **kwargs):
    if created:
        LocationImage.objects.create(
            location=instance,
            is_primary_image=True
        ).save()

    


