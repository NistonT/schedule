# auth_app/views.py

from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from .models import User

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

        if not check_password(password, user.password):
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class TokenRefreshView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh')
        if refresh_token is None:
            return Response({'error': 'Refresh token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return Response({'access': access_token})
        except Exception as e:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class ValidateTokenView(APIView):
    def post(self, request):
        access_token = request.data.get('access')
        if access_token is None:
            return Response({'error': 'Access token is required'}, status=status.HTTP_400_BAD_REQUEST)

        from rest_framework_simplejwt.exceptions import TokenError
        from rest_framework_simplejwt.state import token_backend

        try:
            token_backend.decode(access_token, verify=True)
            return Response({'valid': True})
        except TokenError:
            return Response({'valid': False}, status=status.HTTP_400_BAD_REQUEST)