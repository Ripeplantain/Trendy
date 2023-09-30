from django.db import models

from apps.user.models import CustomUser


class ChatRoom(models.Model):
    """
    Chat model
    """
    name = models.CharField(max_length=255, blank=True, null=True)
    members = models.ManyToManyField(CustomUser, related_name='members')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.name}'
    

class Chat(models.Model):
    """
    Chat model
    """
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='chat_room')
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sender')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.chat_room} - {self.sender}'