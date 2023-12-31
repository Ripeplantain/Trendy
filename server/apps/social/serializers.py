from rest_framework import serializers

from .models import Comment, Post
from apps.file_upload.serializers import FileUploadSerializer
from apps.user.serializers import CustomUserSerializer



class CommentSerializer(serializers.ModelSerializer):

    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'



class PostSerializer(serializers.ModelSerializer):

    likes = CustomUserSerializer(read_only=True, many=True)
    likes_count = serializers.SerializerMethodField()
    user = CustomUserSerializer(read_only=True)
    post_comments = CommentSerializer(read_only=True, many=True)


    class Meta:
        model = Post
        fields = '__all__'


    def get_likes_count(self, obj):
        return obj.likes.count()