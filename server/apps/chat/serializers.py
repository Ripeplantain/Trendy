from rest_framework import serializers
from .models import ChatRoom, Chat
from apps.user.serializers import CustomUserSerializer


class ChatRoomSerializer(serializers.ModelSerializer):
    """
    ChatRoom serializer
    """

    members = CustomUserSerializer(many=True, read_only=True)

    class Meta:
        model = ChatRoom
        fields = '__all__'


class ChatSerializer(serializers.ModelSerializer):
    """
    Chat serializer
    """

    sender = CustomUserSerializer(many=False, read_only=True)
    chat_room = ChatRoomSerializer(many=False, read_only=True)

    class Meta:
        model = Chat
        fields = '__all__'