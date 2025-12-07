from django.shortcuts import render, redirect
from rest_framework import generics
from .serializers import TaskSerializer
from .models import Task
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime


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
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

@csrf_exempt
def newTask(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        task = data.get('task')
        tag = data.get('tag')
        due = data.get('due')
        prio = data.get('prio')

        try:
            due_date = datetime.fromisoformat(due)
        except:
            return JsonResponse({"error": "Invalid date"}, status=400)
        
        new_task = Task.objects.create(
            taskName=task,
            tag=tag,
            due=due_date,
            priority=prio
        )

        return JsonResponse({"message": "Created"}, status=201)
    return JsonResponse({"message": "Invalid"}, status=405)



