from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
from rest_framework import permissions
from rest_framework.decorators import action
# from rest_framework import authentication

class TodoViewSet(viewsets.ModelViewSet):
    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.AllowAny]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    @action(detail=True, methods=['patch'])
    def update_completed(self, request, pk=None):
        todo = self.get_object()
        todo.completed = request.data.get('completed', todo.completed)
        todo.save()
        return Response({'status': 'completed updated'})
