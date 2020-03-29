from django.shortcuts import render
from rest_framework import viewsets
from .models import News
from .serializers import NewsSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FormParser, MultiPartParser,JSONParser

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 1000

class NewsList(generics.ListCreateAPIView):
	authentication_classes = (authentication.TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	queryset = News.objects.all()
	serializer_class = NewsSerializer
	pagination_class = StandardResultsSetPagination

class NewsDetail(generics.RetrieveUpdateDestroyAPIView):
	authentication_classes = (authentication.TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	queryset = News.objects.all()
	serializer_class = NewsSerializer
	def perform_destroy(self, instance):
		instance.proof.delete(save=True)
		return super().perform_destroy(instance)