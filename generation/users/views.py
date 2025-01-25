from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'api_key': user.api_key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
            if user:
                return Response({'api_key': user.api_key}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ValidateTokenView(APIView):
    def post(self, request):
        api_key = request.data.get('api_key')
        if api_key:
            try:
                user = User.objects.get(api_key=api_key)
                return Response({'valid': True, 'user': UserSerializer(user).data}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'valid': False}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'API key is required'}, status=status.HTTP_400_BAD_REQUEST)