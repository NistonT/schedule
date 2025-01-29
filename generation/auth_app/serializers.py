# auth_app/serializers.py

from rest_framework import serializers
from .models import User, Schedule

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['id', 'schedule_data', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    schedule = ScheduleSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'api_key', 'created_at', 'schedule']

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['id', 'schedule_data', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    schedule = ScheduleSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'api_key', 'created_at', 'schedule']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user