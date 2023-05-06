from django.shortcuts import render
from rest_framework import viewsets
from .models import News, NewsVote
from .serializers import NewsSerializer, NewsVoteSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from django.views.decorators.http import require_http_methods
from django.views.generic import ListView
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django.db.models import Count
import os
from django.test import TestCase
from .auth_firebase.authentication import FirebaseAuthentication
from .auth_firebase.permission import IsFirebaseAuthenticated, IsOwner


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = "page_size"
    max_page_size = 1000


class NewsList(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    pagination_class = StandardResultsSetPagination


class NewsCreate(generics.CreateAPIView):
    authentication_classes = (FirebaseAuthentication, JWTAuthentication)
    permission_classes = (IsAuthenticated,)
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    pagination_class = StandardResultsSetPagination

    # Can be used to create more modifiactions to the News object before its saved
    # def perform_create(self, serializer):
    #         serializer.save(author=self.request.user)


class NewsDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (FirebaseAuthentication, JWTAuthentication)
    permission_classes = (IsFirebaseAuthenticated, IsOwner)
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def perform_destroy(self, instance):
        instance.proof.delete(save=True)
        return super().perform_destroy(instance)


class NewsVoteCreate(generics.CreateAPIView):
    authentication_classes = (FirebaseAuthentication, JWTAuthentication)
    http_method_names = ["post"]
    queryset = NewsVote.objects.all()
    serializer_class = NewsVoteSerializer

    def create(self, request, *args, **kwargs):
        self.request.data.update({"ip_address": extract_ip(request)})
        return super(NewsVoteCreate, self).create(request, *args, **kwargs)


class NewsVotesCount(APIView):
    renderer_classes = (JSONRenderer,)

    def get(self, request, news_id):
        # self.request.query_params.get('news_id')
        votes_counts = (
            NewsVote.objects.filter(news_id=news_id)
            .values("choice")
            .annotate(total_votes=Count("choice"))
        )
        voted = (
            NewsVote.objects.filter(news_id=news_id)
            .filter(ip_address=extract_ip(request))
            .exists()
        )
        res = {"already_voted": voted}
        if len(votes_counts) > 1:
            res[votes_counts[0]["choice"]] = votes_counts[0]["total_votes"]
            res[votes_counts[1]["choice"]] = votes_counts[1]["total_votes"]
        elif len(votes_counts) > 0:
            res[votes_counts[0]["choice"]] = votes_counts[0]["total_votes"]
            res[("false" if votes_counts[0]["choice"] else "true")] = 0
        else:
            res["true"] = 0
            res["false"] = 0
        return Response(res)


def extract_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0]
    else:
        return request.META.get("REMOTE_ADDR")
