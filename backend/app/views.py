from .models import Channel, Video, Comment
from .serializers import ChannelSerializer, VideoSerializer, CommentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import fetch_channel_data, fetch_video_data, fetch_comment_data
from simple_history.models import HistoricalRecords

@api_view(['GET'])
def channel_detail(request, channel_id):
    # Check if channel exists in database, if not, fetch data from YouTube API
    if not Channel.objects.filter(id=channel_id).exists():
        fetch_channel_data(channel_id)
        fetch_video_data(channel_id)
        fetch_comment_data(channel_id)
    
    channel = Channel.objects.get(id=channel_id)
    serializer = ChannelSerializer(channel)

    return Response(serializer.data, status=200)

@api_view(['GET'])
def channel_videos(request, channel_id):
    # Check if channel exists in database, if not, fetch data from YouTube API
    if not Channel.objects.filter(id=channel_id).exists():
        fetch_channel_data(channel_id)
        fetch_video_data(channel_id)
        fetch_comment_data(channel_id)
    videos = Video.objects.filter(channel=channel_id)
    serializer = VideoSerializer(videos, many=True)

    return Response(serializer.data, status=200)

@api_view(['GET'])
def video_detail(request, video_id):
    # Get channel id from video id
    video = Video.objects.get(id=video_id)
    channel_id = video.channel.id

    # Check if channel exists in database, if not, fetch data from YouTube API
    if not Channel.objects.filter(id=channel_id).exists():
        fetch_channel_data(channel_id)
        fetch_video_data(channel_id)
        fetch_comment_data(channel_id)

    serializer = VideoSerializer(video)

    return Response(serializer.data, status=200)

@api_view(['GET'])
def video_comments(request, video_id):
    # Get channel id from video id
    video = Video.objects.get(id=video_id)
    channel_id = video.channel.id

    # Check if channel exists in database, if not, fetch data from YouTube API
    if not Channel.objects.filter(id=channel_id).exists():
        fetch_channel_data(channel_id)
        fetch_video_data(channel_id)
        fetch_comment_data(channel_id)

    comments = Comment.objects.filter(video=video_id)
    serializer = CommentSerializer(comments, many=True)
    
    return Response(serializer.data, status=200)

@api_view(['GET'])
def channel_history(request, channel_id):
    try:
        channel = Channel.objects.get(id=channel_id)
    except Channel.DoesNotExist:
        return Response({"error": "Channel not found"}, status=404)
    
    # Getting historical data for the channel
    historical_data = channel.history.all()
    # We will have to serialize this data manually as the django-simple-history doesn't provide a serializer
    data = [
        {
            'title': history.title,
            'views': history.views,
            'subscribers': history.subscribers,
            'video_count': history.video_count,
            'change_date': history.history_date,
            'change_type': history.get_history_type_display(),
        } for history in historical_data
    ]
    return Response(data, status=200)

@api_view(['GET'])
def video_history(request, video_id):
    try:
        video = Video.objects.get(id=video_id)
    except Video.DoesNotExist:
        return Response({"error": "Video not found"}, status=404)
    
    # Getting historical data for the video
    historical_data = video.history.all()
    # We will have to serialize this data manually as the django-simple-history doesn't provide a serializer
    data = [
        {
            'title': history.title,
            'views': history.views,
            'likes': history.likes,
            'comments': history.comments,
            'change_date': history.history_date,
            'change_type': history.get_history_type_display(),
        } for history in historical_data
    ]
    return Response(data, status=200)


