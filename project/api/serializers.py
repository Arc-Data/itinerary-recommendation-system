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
    min_fee = serializers.SerializerMethodField()
    max_fee = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    is_bookmarked = serializers.SerializerMethodField()

    class Meta:
        model = Spot
        fields = ('min_fee', 'max_fee', 'opening_time', 'closing_time', 'tags', 'is_bookmarked')

    def get_min_fee(self, obj):
        return obj.get_min_cost
    
    def get_max_fee(self, obj):
        return obj.get_max_cost

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()] 

    def get_is_bookmarked(self, obj):
        user = self.context.get('user')

        if user:
            return obj.interested.filter(id=user.id).exists()

        return False

class FoodPlaceSerializers(serializers.ModelSerializer):
    class Meta:
        model = FoodPlace
        exclude = []

class AccommodationSerializers(serializers.ModelSerializer):
    class Meta:
        model = Accommodation
        exclude = []

class LocationQuerySerializers(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = ('tags', 'id', 'name', 'primary_image', 'address')

    def get_tags(self, obj):
        spot = Spot.objects.get(pk=obj.id)
        
        if spot:
            return [tag.name for tag in spot.tags.all()]

        return None 
    
    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary_image=True).first()

        if primary_image:
            return primary_image.image.url

        return None
    
class LocationPlanSerializers(serializers.ModelSerializer):
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = ['id', 'name', 'primary_image']

    def get_primary_image(self, obj):
        primary_image = obj.images.filter(is_primary_image=True).first()

        if primary_image:
            return primary_image.image.url

        return None

class LocationSerializers(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    details = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = ('id', 'location_type', 'name', 'address', 'description', 'latitude', 'longitude',  'images', 'details')

    def get_details(self, obj):
        if obj.location_type == '1':
            serializer = SpotSerializers(Spot.objects.get(pk=obj.id))
            return serializer.data
        elif obj.location_type == '2':
            serializer = FoodPlaceSerializers(FoodPlace.objects.get(pk=obj.id))
            return serializer.data
        elif obj.location_type == '3':
            serializer = AccommodationSerializers(Accommodation.objects.get(pk=obj.id))
            return serializer.data
        
        return None

    def get_images(self, obj):
        return [image.image.url for image in obj.images.all()]

class SpotDetailSerializers(serializers.ModelSerializer):
    location_reviews = serializers.SerializerMethodField()

    class Meta:
        model = Spot
        exclude = []

    def get_location_reviews(self, obj):
        location_reviews = obj.review_set.all()
        return ReviewSerializers(location_reviews, many=True).data

class ReviewSerializers(serializers.ModelSerializer):
    user = UserSerializers()
    class Meta:
        model = Review
        exclude = ['location']

class ItineraryListSerializers(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Itinerary 
        fields = '__all__'

    def get_image(self, object):
        return "/media/location_images/Background.jpg"

class ItinerarySerializers(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ['id', 'budget', 'number_of_people', 'user']


class DayDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = '__all__'
            
    
class ItineraryItemSerializer(serializers.ModelSerializer):
    location_details = LocationPlanSerializers(source='location', read_only=True)

    class Meta:
        model = ItineraryItem
        fields = ['id', 'location', 'day', 'location_details']

class DaySerializers(serializers.ModelSerializer):
    itinerary_items = ItineraryItemSerializer(source='itineraryitem_set', many=True)

    class Meta:
        model = Day
        fields = '__all__'


class SpotPopularSerializers(serializers.ModelSerializer):

    class Meta:
        model = Spot
        fields = ['id', 'name', 'description']