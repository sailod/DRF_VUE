from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import uuid

def scramble_uploaded_filename(instance, filename):
    extension = filename.split(".")[-1]
    return "proofs_pics/{}.{}".format(uuid.uuid4(), extension)

class News(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    source = models.URLField(max_length=200, default='http://google.com')
    proof = models.ImageField(default='default_proof.jpg', upload_to=scramble_uploaded_filename)

