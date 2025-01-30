# auth_app/serializers.py

from rest_framework import serializers
from .models import User, Schedule

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'username': {'required': False},
            'email': {'required': False},
            'password': {'required': False, 'write_only': True}
        }

    def update(self, instance, validated_data):
        # Обновляем username, если он предоставлен
        if 'username' in validated_data:
            instance.username = validated_data.get('username', instance.username)

        # Обновляем email, если он предоставлен
        if 'email' in validated_data:
            instance.email = validated_data.get('email', instance.email)

        # Обновляем пароль, если он предоставлен
        if 'password' in validated_data:
            instance.set_password(validated_data.get('password'))

        instance.save()
        return instance

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