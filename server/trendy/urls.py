
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


BASE_URL = 'api/v1/'

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{BASE_URL}user/', include('apps.user.urls')),
    path(f'{BASE_URL}file/', include('apps.file_upload.urls')),
    path(f'{BASE_URL}social/', include('apps.social.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
