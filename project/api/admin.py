from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(User)
admin.site.register(Location)
admin.site.register(Spot)
admin.site.register(Accomodation)
admin.site.register(FoodPlace)
admin.site.register(Itinerary)
admin.site.register(Day)
admin.site.register(ItineraryItem)
admin.site.register(Review)
admin.site.register(Tag)