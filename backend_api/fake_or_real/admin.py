from django.contrib import admin
from .models import News, NewsVote
# Register your models here.
admin.site.register(News)
admin.site.register(NewsVote)