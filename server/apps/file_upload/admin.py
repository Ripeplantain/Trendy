from django.contrib import admin
from .models import FileUpload


@admin.register(FileUpload)
class FileUploadAdmin(admin.ModelAdmin):

    list_display = ('file_name','purpose','created_at','updated_at')
    list_filter = ('purpose',)
    search_fields = ('purpose',)
    ordering = ('purpose',)
