from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'user', views.NotificationViewSet, basename='notification')

urlpatterns = router.urls