from django.db import models

from apps.utils.models.base import BaseMixin
from apps.utils.enums.file import FileUploadPurpose


class FileUpload(BaseMixin):

    file = models.FileField(upload_to='uploads/')
    file_name = models.CharField(max_length=255, blank=True, null=True)
    purpose = models.CharField(max_length=255, blank=True, null=True, choices=FileUploadPurpose.choices())

    def __str__(self):
        return f"File for {self.purpose}"