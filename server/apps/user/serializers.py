from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):


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
        )
        extra_kwargs = { 'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user