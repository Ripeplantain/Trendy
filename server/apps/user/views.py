from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import CustomUserSerializer as user_serializer
from apps.social.models import Post as post_model
from apps.file_upload.models import FileUpload as file_model


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = user_serializer

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return Response(
                {'error': 'Please provide both email and password'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response(
                {'error': 'No user with this email'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not user.check_password(password):
            return Response(
                {'error': 'Incorrect password'},
                status=status.HTTP_400_BAD_REQUEST
            )

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        return Response({
            'refresh': str(refresh),
            'access': str(access_token),
        }, status=status.HTTP_200_OK)


    @action(detail=False, methods=['get'])
    def me(self, request):
        if request.method == 'GET':
            user = User.objects.filter(id=request.user.id).first()
            return Response(user_serializer(user).data)
        elif request.method == 'PATCH':
            serializer = self.get_serializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)

        auth_user = User.objects.filter(email=request.data.get('email')).first()
        file = file_model.objects.filter(id=request.data.get('profile_picture')).first()
        print(request.data.get('profile_picture'))

        if not file:
            return Response(
                {'error': 'Profile picture does not exist'},
                status=status.HTTP_400_BAD_REQUEST  
            )

        if auth_user:
            return Response(
                {'error': 'User already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if serializer.is_valid():
            user = serializer.save(profile_picture=file)
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response({
                'refresh': str(refresh),
                'access': str(access_token),
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    @action(detail=False, methods=['post'])
    def logout(self, request):
        refresh_token = request.data.get('refresh')

        if refresh_token is None:
            return Response(
                {'error': 'Please provide a refresh token'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except:
            return Response(
                {'error': 'Invalid refresh token'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return Response(status=status.HTTP_200_OK)


    @action(detail=False, methods=['get'])
    def new_friends(self, request):
        queryset = User.objects.exclude(friends__id=request.user.id).exclude(id=request.user.id).order_by('?')[:5]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    @action(detail=False, methods=['post'])
    def add_friend(self, request):
        email = request.query_params.get('email')
        user = User.objects.get(email=email)
        
        if request.user in user.friends.all():
            return Response({
                'detail': 'You are already friends with this user'
            },status=status.HTTP_400_BAD_REQUEST)
        
        user.friends.add(request.user)
        return Response({
            'detail': 'Friend added successfully'
        },status=status.HTTP_200_OK)