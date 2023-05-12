from django.urls import include, path
from rest_framework import routers
from api.views import UploadedFileViewSet

router = routers.DefaultRouter()
router.register(r"uploadedfiles", UploadedFileViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
