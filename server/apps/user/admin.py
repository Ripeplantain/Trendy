from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    fieldsets = (
        (None, { 'fields': ('email', 'password') }),
        (
            _('Personal info'),
            {
                'fields': (
                    'first_name',
                    'last_name',
                    'username',
                )
            }
        ),
        (
            _('Meta Information'),
            {
                'fields': (
                    'friends',
                    'location',
                    'phone_number',
                    'occupation',
                    'profile_picture',
                )
            }
        ),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                    'groups',
                    'user_permissions',
                )
            }
        )
    )
    list_display = ['email', 'first_name', 'last_name', 'is_superuser']
    search_fields = ['email', 'first_name', 'last_name']
