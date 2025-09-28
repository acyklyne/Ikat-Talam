from django.db import models
from products.models import Product

class Story(models.Model):
    title = models.CharField(max_length=255)
    excerpt = models.TextField()
    content = models.TextField()
    image_url = models.ImageField(upload_to='stories/')
    related_product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='stories', null=True, blank=True)
    ai_hint = models.TextField()

    def __str__(self):
        return self.title
