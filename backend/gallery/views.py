from rest_framework import viewsets
from .models import GalleryItem
from .serializers import GalleryItemSerializer

class GalleryItemViewSet(viewsets.ModelViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
