from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .manager import CustomUserManager

from apps.file_upload.models import FileUpload


class CustomUser(AbstractUser):

    username = None
    email = models.EmailField(_('email address'), unique=True)
    location = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    occupation = models.CharField(max_length=50)
    impression = models.IntegerField(default=0)
    viewed_profile = models.IntegerField(default=0)
    friends = models.ManyToManyField('self',blank=True)
    profile = models.ForeignKey(FileUpload ,on_delete=models.CASCADE,blank=True,null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email