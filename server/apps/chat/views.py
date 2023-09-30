from rest_framework import viewsets
from .models import ChatRoom, Chat
from .serializers import ChatRoomSerializer, ChatSerializer
from rest_framework.permissions import IsAuthenticated


class ChatRoomViewSet(viewsets.ModelViewSet):
    """
    ChatRoom viewset
    """
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]



class ChatViewSet(viewsets.ModelViewSet):
    """
    Chat viewset
    """
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]