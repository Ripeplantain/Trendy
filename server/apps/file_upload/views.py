from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import FileUpload as file_upload_model
from .serializers import FileUploadSerializer as file_upload_serializer

import os
from django.utils import timezone


class FileUpload(APIView):
    
    def post(self, request):

        serializer = file_upload_serializer(data=request.data)
        if serializer.is_valid():
            file_name = f"{request.user.first_name}_{request.user.last_name}_{timezone.now().strftime('%Y%m%d%H%M%S')}"
            serializer.validated_data['file'].name = file_name
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    def delete(self, request, pk):

        file_upload = file_upload_model.objects.get(pk=pk)
        if os.path.exists(file_upload.file.path):
            os.remove(file_upload.file.path)
        file_upload.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
