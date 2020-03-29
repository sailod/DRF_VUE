from django.shortcuts import render
from rest_framework import viewsets
from .models import News,NewsVote
from .serializers import NewsSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FormParser, MultiPartParser,JSONParser
from django.views.decorators.http import require_http_methods
from django.views.generic import ListView

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

class NewsVoteCreate(generics.ListCreateAPIView):	
	http_method_names=['post']
	authentication_classes = (authentication.TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	queryset = NewsVote.objects.all()
	serializer_class = NewsSerializer

class NewsVotesList(ListView):
	authentication_classes = (authentication.TokenAuthentication,)
	permission_classes = (IsAuthenticated,)
	def get_queryset(self, news_id):
		return NewsVote.objects.filter(news=self.kwargs['news_id']).values(NewsVote.choice).annotate(total_votes=Count('choice'))
