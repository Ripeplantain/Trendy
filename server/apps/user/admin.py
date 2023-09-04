from django.contrib import admin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):

    list_display = ('email','location','phone_number','occupation','impression','viewed_profile','is_staff','is_superuser','is_active')
    list_filter = ('is_staff','is_superuser','is_active')
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ('groups','user_permissions','friends')