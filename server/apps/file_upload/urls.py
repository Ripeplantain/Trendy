from django.urls import path

from . import views

urlpatterns = [
    path('upload/', views.FileUpload.as_view(), name='file_upload'),
    path('upload/<int:pk>/', views.FileUpload.as_view(), name='file_upload'),
]