from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import ChatRoomViewSet


router = DefaultRouter()

router.register(r'chat-rooms', ChatRoomViewSet, basename='chat-rooms')
# router.register(r'messages', ChatViewSet, basename='messages')

urlpatterns = router.urls