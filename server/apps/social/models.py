from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.utils.models.base import BaseMixin
from apps.utils.enums.impressions import ImpressionType
from apps.file_upload.models import FileUpload as File


class Comment(BaseMixin):

    user = models.ForeignKey('user.CustomUser', on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey('social.Post', related_name='post_comments', on_delete=models.CASCADE, null=True, blank=True)
    comment = models.CharField(max_length=100)


    class Meta:
        db_table = 'comment'
        verbose_name = _('comment')
        verbose_name_plural = _('comments')
        ordering = ['created_at']


class Post(BaseMixin):

    user = models.ForeignKey('user.CustomUser', related_name='user_posts' ,on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    file = models.CharField(max_length=255, null=True, blank=True)
    likes = models.ManyToManyField('user.CustomUser', blank=True, related_name='likes')


    class Meta:
        db_table = 'post'
        verbose_name = _('post')
        verbose_name_plural = _('posts')
        ordering = ['-created_at']


class Impressions(BaseMixin):
    
    user = models.ForeignKey('user.CustomUser', related_name='user_impressions' , on_delete=models.CASCADE, null=True, blank=True)
    post = models.ForeignKey('social.Post', on_delete=models.CASCADE, null=True, blank=True)
    impression = models.CharField(max_length=100, choices=ImpressionType.choices())


    class Meta:
        db_table = 'impressions'
        verbose_name = _('impression')
        verbose_name_plural = _('impressions')
        ordering = ['-created_at']
