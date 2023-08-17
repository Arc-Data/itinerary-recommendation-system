from rest_framework import serializers
from .models import *

class LocationSerializers(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Location
        fields = '__all__'

class SpotSerializers(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Spot
        fields = '__all__'