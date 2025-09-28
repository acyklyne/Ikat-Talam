from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    short_description = models.TextField()
    description = models.TextField()
    image_url = models.ImageField(upload_to='products/')
    ai_hint = models.TextField()

    def __str__(self):
        return self.name
