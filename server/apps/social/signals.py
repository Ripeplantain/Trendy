from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from .models import Post, Comment, Impressions
from apps.notifications.models import Notification
from apps.utils.enums.notification import NotificationType
from apps.utils.enums.impressions import ImpressionType



@receiver(post_save, sender=Comment)
def post_commented_on(sender, instance, created, **kargs):
    if created: 
        Notification.objects.create(
            owner=instance.user,
            content=f'{instance.user.first_name} commented on our post',
            type=NotificationType.IMPRESSION.value,
            post=instance.post
        )
        Impressions.objects.create(
            user=instance.user,
            post=instance.post,
            impression=ImpressionType.COMMENT.value
        )


@receiver(m2m_changed, sender=Post.likes.through)
def post_liked(sender, instance, action, **kwargs):
    if action == 'post_add':
        Notification.objects.create(
            owner=instance.user,
            content=f'{instance.user.first_name} liked your post',
            type=NotificationType.IMPRESSION.value,
            post=instance
        )
        Impressions.objects.create(
            user=instance.user,
            post=instance,
            impression=ImpressionType.LIKE.value
        )
    elif action == 'post_remove':
        Notification.objects.create(
            owner=instance.user,
            content=f'{instance.user.first_name} unliked our post',
            type=NotificationType.IMPRESSION.value,
            post=instance
        )
        Impressions.objects.create(
            user=instance.user,
            post=instance,
            impression=ImpressionType.UNLIKE.value
        )

