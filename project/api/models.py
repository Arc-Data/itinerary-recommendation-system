from datetime import timedelta
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from .managers import CustomUserManager
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils import timezone

import os

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
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="preferences")
    art = models.BooleanField(default=False)
    activity = models.BooleanField(default=False)
    culture = models.BooleanField(default=False)
    entertainment = models.BooleanField(default=False)
    history = models.BooleanField(default=False)
    nature = models.BooleanField(default=False)
    religion = models.BooleanField(default=False)
         
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
    owner = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
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
        super(Location, self).save(*args, **kwargs)

        if self.location_type == '1' and not hasattr(self, 'spot'):
            spot = Spot(location_ptr=self)
            spot.__dict__.update(self.__dict__)
            spot.save()
        elif self.location_type == '2' and not hasattr(self, 'foodplace'):
            foodplace = FoodPlace(location_ptr=self)
            foodplace.__dict__.update(self.__dict__)
            foodplace.save()
        elif self.location_type == '3' and not hasattr(self, 'accommodation'):
            accommodation = Accommodation(location_ptr=self)
            accommodation.__dict__.update(self.__dict__)
            accommodation.save()

    def __str__(self):
        return self.name

class OwnershipRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    is_approved = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

class CustomFee(models.Model):
    spot = models.OneToOneField("Spot", on_delete=models.CASCADE, related_name='custom_fee')
    min_cost = models.FloatField()
    max_cost = models.FloatField()

    def save(self, *args, **kwargs):
        if self.min_cost >= self.max_cost:
            raise ValueError("min_cost must be less than max_cost.")
        
        super().save(*args, **kwargs)

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    spot = models.ForeignKey("Spot", on_delete=models.CASCADE)
    datetime_created = models.DateTimeField(default=timezone.now)
    class Meta:
        unique_together = ('user', 'spot')
        ordering = ['-datetime_created']

    def __str__(self):
        return f"{self.user.get_full_name} bookmarked {self.spot.name}"

def location_image_path(instance, filename):
    ext = filename.split('.')[-1]
    folder_name = instance.location.name.replace(" ", "_")
    filename = f"{instance.location.name}.{ext}"
    return os.path.join('location_images', folder_name, filename)


class LocationImage(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=location_image_path, default='location_images/Background.jpg', max_length=512)
    is_primary_image = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.location.name}"

class Spot(Location):
    fees = models.PositiveIntegerField(blank=True, null=True)
    expected_duration = models.DurationField(default=timedelta(hours=1))
    interested = models.ManyToManyField(User, through=Bookmark, related_name="bookmarks")
    tags = models.ManyToManyField("Tag", related_name="spots")
    opening_time = models.TimeField(blank=True, null=True)
    closing_time = models.TimeField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    @property
    def get_min_cost(self):
        if hasattr(self, 'custom_fee') and self.custom_fee.min_cost is not None:
            return self.custom_fee.min_cost
        else:
            return self.fees if self.fees is not None else None

    @property
    def get_max_cost(self):
        if hasattr(self, 'custom_fee') and self.custom_fee.max_cost is not None:
            return self.custom_fee.max_cost
        else:
            return self.fees if self.fees is not None else None
        
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
    name = models.CharField(max_length=60, default="My Trip")

class Day(models.Model):
    date = models.DateField()
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    color = models.CharField(max_length=7, default="#184E77")
    completed = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=1)
    rating = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['date']

class ItineraryItem(models.Model):
    day = models.ForeignKey(Day, on_delete=models.CASCADE, null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.day.date} - {self.location.name} - {self.order}"

class ModelItinerary(models.Model):
    locations = models.ManyToManyField("Spot")

    @property
    def total_min_cost(self):
        min_costs = [spot.get_min_cost for spot in self.locations.all()]
        return sum(min_costs)

    @property
    def total_max_cost(self):
        max_costs = [spot.get_max_cost for spot in self.locations.all()]
        return sum(max_costs)

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