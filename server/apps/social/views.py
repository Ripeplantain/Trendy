from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404

import functools


from .serializers import CommentSerializer, PostSerializer
from .models import Comment, Post
from apps.file_upload.models import FileUpload as File
from apps.utils.enums.file import FileUploadPurpose as file_enum
from apps.utils.permissions import IsPostOwner


class PostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    serializer_class = PostSerializer


    def get_permissions(self):
        if self.action in ['list','create','retrieve']:
            permission_classes = [IsAuthenticated]
        elif self.action in ['update','destroy']:
            permission_classes = [IsPostOwner]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]


    
    @action(detail=False, methods=['post'])
    def create_post(self, request):
        """
        Create a post
        """
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        file_id = request.data.get('file')
        if not file_id:
            post = serializer.save(user=request.user)
            return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
        else:
            file = File.objects.filter(id=request.data['file']).first()
            if file and file.purpose == file_enum.POST.value:
                post = serializer.save(user=request.user, file=file)
            else:
                return Response({'detail': 'Invalid file'}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['get'])
    def user_posts(self, request):
        posts = Post.objects.filter(user=request.user)
        count = posts.count()
        serializer = PostSerializer(posts, many=True)
        return Response({
            'count': count,
            'posts': serializer.data
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """
        Like a post
        """
        post = self.get_object()
        post.likes.add(request.user)
        return Response({
            'detail': 'Post liked successfully'
        },status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def unlike(self, request, pk=None):
        """
        Unlike a post
        """
        post = self.get_object()
        post.likes.remove(request.user)
        return Response({
            'detail': 'Post unliked successfully'
        },status=status.HTTP_200_OK)