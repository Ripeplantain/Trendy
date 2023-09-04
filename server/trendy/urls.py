
from django.contrib import admin
from django.urls import path, include


BASE_URL = 'api/v1/'

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{BASE_URL}user/', include('apps.user.urls')),
    path(f'{BASE_URL}file/', include('apps.file_upload.urls')),
]
