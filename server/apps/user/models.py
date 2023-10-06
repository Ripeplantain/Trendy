from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


from apps.file_upload.models import FileUpload
from apps.utils.models.base import BaseMixin

import uuid

class CustomUser(AbstractUser, BaseMixin):

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    friends = models.ManyToManyField('self', blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=255, null=True, blank=True)
    occupation = models.CharField(max_length=255, null=True, blank=True)
    profile_picture = models.CharField(max_length=255, null=True, blank=True)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.email
    
    def generate_username(self):
        username = f"user_{uuid.uuid4().hex[:8]}"
        return username
    
    def save(self, *args, **kwargs):
        if not self.username:
            self.username = self.generate_username()
        super().save(*args, **kwargs)