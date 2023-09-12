from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):

        list_display = ('owner','content','is_read','type')
        list_filter = ('owner',)
        search_fields = ('owner',)
        ordering = ('owner',)