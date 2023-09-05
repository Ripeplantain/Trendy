from rest_framework import permissions


class IsPostOwner(permissions.BasePermission):

    message = 'You must be the owner of this post.'

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user