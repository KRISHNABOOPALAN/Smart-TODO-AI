from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, ContextEntryViewSet, CategoryViewSet, TaskAIEnhanceView

router = DefaultRouter()
router.register('tasks', TaskViewSet)
router.register('contexts', ContextEntryViewSet)
router.register('categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('ai/enhance/', TaskAIEnhanceView.as_view()),
]