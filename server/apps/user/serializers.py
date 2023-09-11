from rest_framework import serializers
from django.contrib.auth import get_user_model

# from apps.social.serializers import PostSerializer
from apps.social.models import Post

User = get_user_model()

class UserPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'
        depth = 1


class CustomUserSerializer(serializers.ModelSerializer):

    friends = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    count_friends = serializers.SerializerMethodField()
    user_posts = serializers.StringRelatedField(many=True, read_only=True)
    post_counts = serializers.SerializerMethodField()
    user_impressions = serializers.StringRelatedField(many=True, read_only=True)
    impression_counts = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
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
        )
        extra_kwargs = { 'password': {'write_only': True}}

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
    