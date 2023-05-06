from rest_framework import serializers
from .models import News, NewsVote
from django.contrib.auth import get_user_model


class NewsSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(
        queryset=get_user_model().objects.all(),
        default=serializers.CurrentUserDefault(),
    )

    class Meta:
        model = News
        fields = "__all__"


class NewsVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsVote
        fields = "__all__"
