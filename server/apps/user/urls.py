from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
        TokenObtainPairView,
        TokenRefreshView,
)

from . import views


router = DefaultRouter()
router.register(r'auth', views.UserViewSet, basename='auth')

urlpatterns = [
        path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += router.urls

