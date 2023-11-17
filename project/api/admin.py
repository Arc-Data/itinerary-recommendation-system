from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Location)
admin.site.register(Spot)
admin.site.register(LocationImage)
admin.site.register(Accommodation)
admin.site.register(Preferences)
admin.site.register(ModelItinerary)
admin.site.register(OwnershipRequest)
admin.site.register(CustomFee)
admin.site.register(FoodPlace)
admin.site.register(Itinerary)
admin.site.register(Day)
admin.site.register(ItineraryItem)
admin.site.register(Review)
admin.site.register(Tag)
admin.site.register(Bookmark)