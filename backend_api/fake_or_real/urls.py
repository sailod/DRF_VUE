from django.urls import path, include
from . import views 
from rest_framework import routers 
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.SimpleRouter()

urlpatterns = [
    #path('', include(router.urls)),
    path('news/', views.NewsList.as_view()),
    path('news/<int:pk>/', views.NewsDetail.as_view())
]
urlpatterns = format_suffix_patterns(urlpatterns)