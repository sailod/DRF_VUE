from rest_framework import serializers
from .models import News, NewsVote

class NewsSerializer(serializers.ModelSerializer):
	class Meta:
		model = News
		fields = '__all__'

class NewsVoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = NewsVote
		fields = '__all__'
