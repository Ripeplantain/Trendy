from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import NotificationSerializer
from .models import Notification


class NotificationViewSet(viewsets.ModelViewSet):

    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def list(self, request):
        """
        List all notifications
        """
        notifications = Notification.objects.filter(owner=request.user, is_read=False)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        """
        Create a notification
        """
        serializer = NotificationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        notification = serializer.save(user=request.user)
        return Response(NotificationSerializer(notification).data, status=status.HTTP_201_CREATED)

    def destroy(self, request, pk=None):
        """
        Delete a notification
        """
        notification = Notification.objects.get(id=pk)
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True, methods=['post'])
    def read_notification(self, request, pk=None):
        """
        Read a notification
        """
        notification = Notification.objects.get(id=pk)
        notification.read = True
        notification.save()
        return Response(status=status.HTTP_200_OK)