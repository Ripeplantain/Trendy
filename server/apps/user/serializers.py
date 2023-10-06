from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.social.models import Post
from apps.file_upload.serializers import FileUploadSerializer

User = get_user_model()

class UserPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'
        depth = 1


class FriendSerializer(serializers.ModelSerializer):

    profile_picture = FileUploadSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):

    count_friends = serializers.SerializerMethodField()
    user_posts = serializers.StringRelatedField(many=True, read_only=True)
    post_counts = serializers.SerializerMethodField()
    user_impressions = serializers.StringRelatedField(many=True, read_only=True)
    impression_counts = serializers.SerializerMethodField()
    friends = FriendSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'occupation',
            'location',
            'phone_number',
            'password',
            'friends',
            'count_friends',
            'user_posts',
            'post_counts',
            'user_impressions',
            'impression_counts',
            'profile_picture'
        )
        extra_kwargs = { 
                        'password': {'write_only': True},
                        'friends': {'read_only': True},
                        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
    def get_count_friends(self, obj):
        return obj.friends.count()
    
    def get_post_counts(self, obj):
        return obj.user_posts.count()
    
    def get_impression_counts(self, obj):
        return obj.user_impressions.count()
