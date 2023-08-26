from django.contrib.auth import get_user_model
from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.hashers import make_password

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
   username_field = get_user_model().EMAIL_FIELD

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