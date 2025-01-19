from django.urls import path
from todo.views import TodoViewSet

urlpatterns = [
    path('todos/', TodoViewSet.as_view({'get': 'list', 'post': 'create'}), name='todo-list'),
    path('todos/<int:pk>/', TodoViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy', 'patch': 'partial_update'}), name='todo-detail'),
]
