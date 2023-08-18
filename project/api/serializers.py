from rest_framework import serializers
from .models import *

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'is_superuser', 'email', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions', 'last_login']

class ReviewSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    class Meta:
        model = Review
        exclude = ['location']

class LocationSerializers(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Location
        exclude = ()

class SpotDetailSerializers(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    location_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Spot
        exclude = ['historical_relevance', 'art_focus', 'activity_focus']

    def get_location_reviews(self, obj):
        location_reviews = obj.review_set.all()
        return ReviewSerializers(location_reviews, many=True).data
    
class SpotPopularSerializers(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Spot
        fields = ['id', 'image', 'name', 'description']