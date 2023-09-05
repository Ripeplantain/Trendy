from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.utils.models.base import BaseMixin


class Comment(BaseMixin):

    user = models.ForeignKey('user.CustomUser', on_delete=models.CASCADE)
    post = models.ForeignKey('social.Post', on_delete=models.CASCADE)
    content = models.CharField(max_length=100)


    class Meta:
        db_table = 'comment'
        verbose_name = _('comment')
        verbose_name_plural = _('comments')

    def __str__(self):
        return self.content


class Post(BaseMixin):

    user = models.ForeignKey('user.CustomUser', on_delete=models.CASCADE, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    file = models.ForeignKey('file_upload.FileUpload', on_delete=models.CASCADE, blank=True, null=True)
    likes = models.ManyToManyField('user.CustomUser', blank=True, related_name='likes')


    class Meta:
        db_table = 'post'
        verbose_name = _('post')
        verbose_name_plural = _('posts')
        ordering = ['-created_at']

