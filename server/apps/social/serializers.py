from rest_framework import serializers

from .models import Comment, Post
from apps.file_upload.serializers import FileUploadSerializer
from apps.user.serializers import CustomUserSerializer

class PostSerializer(serializers.ModelSerializer):

    file = FileUploadSerializer(read_only=True)
    likes = CustomUserSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = '__all__'



class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'

