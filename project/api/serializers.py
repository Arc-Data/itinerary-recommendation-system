from django.contrib.auth import get_user_model
from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        token['is_staff'] = user.is_staff
        token['set_preferences'] = user.set_preferences
        return token

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions', 'last_login']

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = get_user_model().objects.create(**validated_data)
        return user
    
class SpotSerializers(serializers.ModelSerializer):
    location_type = 1
    
    class Meta:
        model = Spot
        exclude = []

class FoodPlaceSerializers(serializers.ModelSerializer):
    location_type = 2
    
    class Meta:
        model = FoodPlace
        exclude = []

class AccomodationSerializers(serializers.ModelSerializer):
    location_type = 3
    
    class Meta:
        model = Accommodation
        exclude = []

class LocationImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = LocationImage
        fields = ['image']
        
    
class LocationSerializers(serializers.ModelSerializer):
    images = LocationImageSerializers(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()
    location_type = serializers.SerializerMethodField()
    
    class Meta:
        model = Location
        fields = ('id', 'location_type', 'name', 'address', 'description', 'latitude', 'longitude', 'primary_image', 'images', )

    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary_image=True).first()

        if primary_image:
            return primary_image.image.url
        
        hasattr()

        return None

    def get_location_type(self, obj):
        if hasattr(obj, 'spot'):
            return '1'
        elif hasattr(obj, 'foodplace'):
            return '2'
        elif hasattr(obj, 'accomodation'):
            return '3'
        
        print("Error identifying location type")
        return None

class ReviewSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    class Meta:
        model = Review
        exclude = ['location']

class ItinerarySerializers(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ['id', 'budget', 'number_of_people', 'user']

class DaySerializers(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'
            
class SpotDetailSerializers(serializers.ModelSerializer):
    location_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Spot
        exclude = []

    def get_location_reviews(self, obj):
        location_reviews = obj.review_set.all()
        return ReviewSerializers(location_reviews, many=True).data
    
class SpotPopularSerializers(serializers.ModelSerializer):

    class Meta:
        model = Spot
        fields = ['id', 'name', 'description']