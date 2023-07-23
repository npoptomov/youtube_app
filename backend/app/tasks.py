# app/tasks.py
from .services import fetch_channel_data, fetch_video_data, fetch_comment_data
from .models import Channel

def fetch_data():
    # Fetch data for each channel
    for channel in Channel.objects.all():
        channel_id = channel.id
        print(channel_id)
        fetch_channel_data(channel_id)
        fetch_video_data(channel_id)
        fetch_comment_data(channel_id)

