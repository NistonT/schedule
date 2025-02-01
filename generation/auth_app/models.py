# auth_app/models.py

from django.db import models
import json
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import secrets

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.api_key = secrets.token_urlsafe(32)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.create_user(
            username=username,
            email=self.normalize_email(email),
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    api_key = models.CharField(max_length=256, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    schedule = models.ForeignKey('Schedule', on_delete=models.SET_NULL, null=True, blank=True, related_name='user_schedule')

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Schedule(models.Model):
    user = models.ForeignKey('User', on_delete=models.SET_NULL, null=True, blank=True, related_name='schedules')
    schedule = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)