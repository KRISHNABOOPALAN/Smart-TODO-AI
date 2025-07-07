from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    usage_frequency = models.IntegerField(default=0)

    def __str__(self): return self.name
class ContextEntry(models.Model):
    SOURCE_CHOICES = [
        ('email', 'Email'),
        ('whatsapp', 'WhatsApp'),
        ('note', 'Note')
    ]
    content = models.TextField()
    source = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    insights = models.JSONField(null=True, blank=True)

    def __str__(self): return f"{self.source} - {self.timestamp}"


class Task(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('done', 'Done')
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    priority_score = models.FloatField(default=0)
    deadline = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self): return self.title
