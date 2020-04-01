from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import News
import os

# @receiver(post_save, sender=News)
# def update_image_path(sender, instance, created, **kwargs):
#     # instance.news.save()
#     print(os.path.basename(instance.proof))