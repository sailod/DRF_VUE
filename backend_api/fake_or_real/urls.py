from django.urls import path, include
from . import views 
from .auth_web3 import authentication_views
from rest_framework import routers 
from rest_framework.urlpatterns import format_suffix_patterns

router = routers.SimpleRouter()

urlpatterns = [
    #path('', include(router.urls)),
    path('news/', views.NewsList.as_view()),
    path('news/create/', views.NewsCreate.as_view()),
    path('news/<int:pk>/', views.NewsDetail.as_view()),
    path('news-vote/', views.NewsVoteCreate.as_view()),
    path('news-vote/<int:news_id>/', views.NewsVotesCount.as_view()),
    path('get-auth-message/', authentication_views.GetAuthMessageView.as_view()),
    path('web3-auth/', authentication_views.Web3AuthView.as_view()),
    # path('auth-web3/verify/', views.Web3VerifyView.as_view())
]
urlpatterns = format_suffix_patterns(urlpatterns)