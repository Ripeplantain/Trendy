from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r'auth', views.UserViewSet, basename='auth')
urlpatterns = router.urls

