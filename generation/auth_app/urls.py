# auth_app/urls.py

from django.urls import path
from .views import RegisterView, LoginView, TokenRefreshView, ValidateTokenView, UserProfileView, UpdateApiKeyView, \
    UpdateUserView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/validate/', ValidateTokenView.as_view(), name='token_validate'),
    path('user/profile/', UserProfileView.as_view(), name='user_profile'),
    path('user/update-api-key/', UpdateApiKeyView.as_view(), name='update_api_key'),
    path('user/update/<int:user_id>/', UpdateUserView.as_view(), name='update_user'),
]