from django.urls import path
from . import views

urlpatterns = [
    path('channel/<str:channel_id>/', views.channel_detail, name='channel_detail'),
    path('channel/<str:channel_id>/videos/', views.channel_videos, name='channel_videos'),
    path('videos/<str:video_id>/', views.video_detail, name='video_detail'),
    path('videos/<str:video_id>/comments/', views.video_comments, name='video_comments'),
    path('channel/<str:channel_id>/history/', views.channel_history, name='channel_history'),
    path('videos/<str:video_id>/history/', views.video_history, name='video_history'),
]
