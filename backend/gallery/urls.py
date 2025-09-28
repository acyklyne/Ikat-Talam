from rest_framework.routers import DefaultRouter
from .views import GalleryItemViewSet

router = DefaultRouter()
router.register(r'gallery-items', GalleryItemViewSet)

urlpatterns = router.urls
