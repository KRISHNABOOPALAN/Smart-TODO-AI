from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task, ContextEntry, Category
from .serializers import TaskSerializer, ContextEntrySerializer, CategorySerializer
from .lm_local import ask_local_ai

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class ContextEntryViewSet(viewsets.ModelViewSet):
    queryset = ContextEntry.objects.all()
    serializer_class = ContextEntrySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TaskAIEnhanceView(APIView):
    def post(self, request):
        title = request.data.get("title")
        context = request.data.get("context")
        prompt = f"Enhance this task:\nTitle: {title}\nContext: {context}"
        enhanced_text = ask_local_ai(prompt)
        return Response({"enhanced_description": enhanced_text})