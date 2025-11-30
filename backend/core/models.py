from django.db import models

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    taskName = models.CharField(max_length=200)
    tag = models.TextField()
    due = models.DateTimeField()
    priority = models.IntegerField()
    isDone = models.BooleanField(default=False)

    def __str__(self):
        return self.taskName