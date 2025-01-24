from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer, UserLoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
import logging

logger = logging.getLogger(__name__)

class UserRegistration(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        logger.info(f"Login attempt: username={username}")
        user = authenticate(request, username=username, password=password)
        if user:
            logger.info(f"User authenticated successfully: {user.username}")
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'api_key': user.api_key, 'user_id': user.id})
        else:
            logger.warning(f"Authentication failed for user: {username}")
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'