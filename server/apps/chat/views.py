from rest_framework import viewsets, status
from .models import ChatRoom, Chat
from .serializers import ChatRoomSerializer, ChatSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.user.models import CustomUser
from django.db.models import Q, Count
import random
import string

class ChatRoomViewSet(viewsets.ModelViewSet):
    """
    ChatRoom viewset
    """
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    @classmethod
    def generate_random_string(self, length):
        return ''.join(random.choice(string.ascii_letters) for i in range(length))


    @action(detail=False, methods=['get'])
    def get_chat_room(self, request):
        sender = request.query_params.get('sender')
        receiver = request.query_params.get('receiver')
        chat_room_name = self.generate_random_string(10)

        chat_room = ChatRoom.objects.filter(
            members__in=[sender, receiver]
        ).annotate(members_count=Count('members')).filter(members_count=2)
        print(chat_room)

        if chat_room.exists():
            serializer = ChatRoomSerializer(chat_room, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            new_chat = ChatRoom.objects.create(name=chat_room_name)
            new_chat.members.add(sender, receiver)
            new_chat.save()
            serializer = ChatRoomSerializer(new_chat)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def fetch_messages(self, request):
        """
        Get chat messages
        """

        chat_room = request.query_params.get('chat_room')
        messages = Chat.objects.filter(chat_room=chat_room)
        serializer = ChatSerializer(messages, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def send_message(self, request):
        """
        Send message
        """ 

        chat_room = ChatRoom.objects.get(id=request.data['chat_room'])
        sender = CustomUser.objects.get(id=request.data['sender'])
        serializer = ChatSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(
            chat_room=chat_room,
            sender=sender
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

