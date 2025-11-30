from django.shortcuts import render
from rest_framework import generics
from .serializers import TaskSerializer
from .models import Task
from django.utils import timezone

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        status = self.request.query_params.get("status")
        now = timezone.now()

        tasks = Task.objects.all()

        match status:
            case "ongoing": 
                return tasks.filter(due__gt=now, isDone=False)
            case "missed": 
                return tasks.filter(due__lt=now, isDone=False)
            case "completed":
                return tasks.filter(isDone=True)
        
        return tasks
        