from django.db import models


class Ad(models.Model):
    title = models.CharField(max_length=200)
    descr = models.TextField(max_length=500)
    body = models.TextField(max_length=5000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ['-updated_at']