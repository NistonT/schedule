# auth_app/views.py

from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from .serializers import UserUpdateSerializer, ChangePasswordSerializer
from django.contrib.auth.hashers import make_password, check_password
from .models import User
import secrets
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Schedule, User
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

class GenerateTimetableView(APIView):
    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Получаем входные данные из запроса
        input_data = request.data

        # Проверяем, что все необходимые поля присутствуют
        required_fields = ['t_cabinets', 't_groups', 't_subjects', 't_subjects_hours', 't_teachers', 't_teachers_link']
        if not all(field in input_data for field in required_fields):
            return Response({'error': 'Missing required fields in input data'}, status=status.HTTP_400_BAD_REQUEST)

        # Преобразуем входные данные в строку JSON
        input_json = json.dumps(input_data)

        # Загрузка модели и токенизатора
        model_name = "path/to/llama3.1"  # Укажите путь к вашей модели LLaMA 3.1
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(model_name)

        # Генерация расписания через модель
        inputs = tokenizer(input_json, return_tensors="pt")
        outputs = model.generate(inputs["input_ids"], max_length=1024, num_return_sequences=1)
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

        # Парсим сгенерированный текст в JSON
        try:
            timetable = json.loads(generated_text)
        except json.JSONDecodeError:
            return Response({'error': 'Failed to decode generated timetable'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Сохраняем результат в базу данных
        schedule_entry = Schedule.objects.create(
            user=user,
            schedule=timetable
        )

        return Response(timetable, status=status.HTTP_200_OK)

class ChangePasswordView(APIView):
    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ChangePasswordSerializer(data=request.data, context={'user': user})
        if serializer.is_valid():
            # Обновляем пароль на новый
            user.password = make_password(serializer.validated_data['new_password'])
            user.save()
            return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckPasswordView(APIView):
    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        entered_password = request.data.get('password')
        if entered_password is None:
            return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Проверяем пароль с помощью функции check_password
        is_valid = check_password(entered_password, user.password)

        return Response({
            'is_valid': is_valid
        }, status=status.HTTP_200_OK)

class UpdateUserView(APIView):
    def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateApiKeyView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        if not user_id:
            return Response({'error': 'user_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        new_api_key = secrets.token_urlsafe(32)  # Генерируем новый API ключ
        user.api_key = new_api_key
        user.save()

        return Response({
            'new_api_key': new_api_key
        }, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    # Убираем проверку аутентификации

    def get(self, request):
        # Если нужно вернуть данные конкретного пользователя, например по id
        user_id = request.query_params.get('user_id')  # Или как-то иначе определите, чьи данные нужны
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

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