from django.db import models

class GalleryItem(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.ImageField(upload_to='gallery/')
    ai_hint = models.TextField()

    def __str__(self):
        return self.title
