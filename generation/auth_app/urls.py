# auth_app/urls.py

from django.urls import path
from .views import RegisterView, LoginView, TokenRefreshView, ValidateTokenView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/validate/', ValidateTokenView.as_view(), name='token_validate'),
]