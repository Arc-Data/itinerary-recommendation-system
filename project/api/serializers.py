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

class ReviewSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    class Meta:
        model = Review
        exclude = ['location']

class LocationImageSerializers(serializers.ModelSerializer):
    class Meta:
        model = LocationImage
        fields = ['image']
        
    
class LocationSerializers(serializers.ModelSerializer):
    images = LocationImageSerializers(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Location
        fields = ('id', 'name', 'address', 'description', 'latitude', 'longitude', 'images', 'primary_image')

    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary_image=True).first()
        
        if primary_image:
            return primary_image.image.url
        
        return None

class SpotDetailSerializers(serializers.ModelSerializer):
    location_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Spot
        exclude = ['historical_relevance', 'art_focus', 'activity_focus']

    def get_location_reviews(self, obj):
        location_reviews = obj.review_set.all()
        return ReviewSerializers(location_reviews, many=True).data
    
class SpotPopularSerializers(serializers.ModelSerializer):

    class Meta:
        model = Spot
        fields = ['id', 'name', 'description']