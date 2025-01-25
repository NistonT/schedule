from django.db import models
import uuid
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    email = models.EmailField(unique=True)
    api_key = models.CharField(max_length=40, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if not self.api_key:
            self.api_key = uuid.uuid4().hex
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username

    @classmethod
    def create_user(cls, username, email, password):
        # Хешируем пароль
        hashed_password = make_password(password)
        # Создаём пользователя
        user = cls(username=username, email=email, password=hashed_password)
        user.save()
        return user