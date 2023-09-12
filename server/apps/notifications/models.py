from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.utils.models.base import BaseMixin
from apps.utils.enums.notification import NotificationType
from apps.user.models import CustomUser



class Notification(BaseMixin):

    owner = models.ForeignKey(CustomUser, related_name='owner', on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    type = models.CharField(max_length=50, choices=NotificationType.choices())

    class Meta:
        db_table = 'Notifications'
        verbose_name = _('notification')
        verbose_name_plural = _('notifications')
        ordering = ['-created_at']