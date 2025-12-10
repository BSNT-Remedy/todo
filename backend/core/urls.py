from django.urls import path
from . import views

urlpatterns = [
    path('', views.TaskListCreate.as_view(), name='task-list'),
    path('new/', views.newTask, name='new'),
    path('done/<int:pk>/', views.toggleIsDone, name='toggle-done'),
    path('delete/<int:pk>/', views.deleteTask, name='delete'),
    path('edit/<int:pk>/', views.editTask, name='edit'),
]