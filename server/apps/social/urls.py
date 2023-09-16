from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'post', views.PostViewSet, basename='post')
router.register(r'comment', views.CommentViewSet, basename='comment')
urlpatterns = router.urls
