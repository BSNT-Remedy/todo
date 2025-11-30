from django import forms
from .models import Task

INPUT_CLASSES = 'todo-inputs-style'

class NewTaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['taskName', 'tag', 'due', 'priority']

        widgets = {
            'taskName': forms.TextInput(attrs={
                'class': INPUT_CLASSES,
            }),
            'tag': forms.Select(attrs={
                'class': INPUT_CLASSES
            }),
            'priority': forms.Select(attrs={
                'class': INPUT_CLASSES
            }),
            'due': forms.DateTimeInput(attrs={
                'class': INPUT_CLASSES,
                'type': 'datetime-local',
            })
        }