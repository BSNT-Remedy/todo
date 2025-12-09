from django.urls import path
from . import views

urlpatterns = [
    path('', views.TaskListCreate.as_view(), name='task-list'),
    path('new/', views.newTask, name='new'),
    path('done/<int:pk>/', views.doneTask, name='done'),
    path('delete/<int:pk>/', views.deleteTask, name='delete'),
]