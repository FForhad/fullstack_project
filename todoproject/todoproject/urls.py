from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from todo.views import TodoViewSet

router = DefaultRouter()
router.register(r'todos', TodoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('todo.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]
