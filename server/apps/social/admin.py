from django.contrib import admin
from .models import Post, Comment, Impressions


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

        list_display = ('user','content','created_at','updated_at')
        list_filter = ('user',)
        search_fields = ('user',)
        ordering = ('user',)


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
        
        list_display = ('user','post','comment','created_at','updated_at')
        list_filter = ('user',)
        search_fields = ('user',)
        ordering = ('user',)


@admin.register(Impressions)
class ImpressionsAdmin(admin.ModelAdmin):

        list_display = ('user','post','impression','created_at','updated_at')
        list_filter = ('user',)
        search_fields = ('user',)
        ordering = ('user',)