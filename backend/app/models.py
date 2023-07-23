from django.db import models
from simple_history.models import HistoricalRecords

class Channel(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    views = models.BigIntegerField()
    subscribers = models.IntegerField()
    video_count = models.IntegerField()
    most_viewed_videos = models.ManyToManyField('Video', related_name='most_viewed_videos')
    most_likes_videos = models.ManyToManyField('Video', related_name='most_likes_videos')
    history = HistoricalRecords()

class Video(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    views = models.IntegerField()
    likes = models.IntegerField()
    comments = models.IntegerField()
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    history = HistoricalRecords()

class Comment(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    text = models.TextField()
    likes = models.IntegerField()
    replies = models.IntegerField()
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
