from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
# from rest_framework import permissions
# from rest_framework import authentication

class TodoViewSet(viewsets.ModelViewSet):
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAuthenticated]
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
