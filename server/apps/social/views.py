from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404


from .serializers import CommentSerializer, PostSerializer
from .models import Comment, Post
from apps.file_upload.models import FileUpload as File
from apps.utils.enums.file import FileUploadPurpose as file_enum
from apps.utils.permissions import IsPostOwner, IsCommentOwner


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


    def list(self, request):
        """
        List all posts
        """
        posts = Post.objects.exclude(likes=request.user)[:20]
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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
                return Response(PostSerializer(post).data, status=status.HTTP_201_CREATED)
            else:
                return Response({'detail': 'Invalid file'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """
        Like a post
        """
        post = self.get_object()
        if request.user in post.likes.all():
            return Response({
                'detail': 'You already liked this post'
            },status=status.HTTP_400_BAD_REQUEST)
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
    


class CommentViewSet(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.action in ['create_comment','post_comments','retrieve']:
            permission_classes = [IsAuthenticated]
        elif self.action in ['update','destroy']:
            permission_classes = [IsCommentOwner]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]


    @action(detail=True, methods=['post'])
    def create_comment(self, request, pk=None):

        post = get_object_or_404(Post, pk=pk)
        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save(user=request.user, post=post)
        return Response(CommentSerializer(comment).data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def post_comments(self, request, pk=None):
        post = get_object_or_404(Post, pk=pk)
        comments = Comment.objects.filter(post=post)
        count = comments.count()
        serializer = CommentSerializer(comments, many=True)
        return Response({
            'count': count,
            'comments': serializer.data
        }, status=status.HTTP_200_OK)