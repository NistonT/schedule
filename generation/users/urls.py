from django.urls import path
from .views import UserRegistration, user_login, UserDetail

urlpatterns = [
    path('register/', UserRegistration.as_view(), name='register'),
    path('login/', user_login, name='login'),
    path('<uuid:id>/', UserDetail.as_view(), name='user-detail'),
]