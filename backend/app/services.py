import requests

api_key = 'AIzaSyC69P18Z4uFXYd0gY8ut9uOiRIhUi7kOw4'
base_url = 'https://www.googleapis.com/youtube/v3/'


def fetch_channel_data(channel_id):
    from .models import Channel, Video

    # Fetch channel data
    url = f'{base_url}channels?part=snippet,statistics&id={channel_id}&key={api_key}'
    response = requests.get(url).json()

    if 'items' in response:
        for item in response['items']:
            channel, created = Channel.objects.update_or_create(
                id=item['id'],
                defaults={
                    'title': item['snippet']['title'],
                    'views': item['statistics']['viewCount'],
                    'subscribers': item['statistics']['subscriberCount'],
                    'video_count': item['statistics']['videoCount'],
                }
            )

        print('Channel data updated!')
    else:
        print(response)


def fetch_video_data(channel_id):
    from .models import Channel, Video

    channel = Channel.objects.get(id=channel_id)

    next_page_token = None

    while True:
        # Fetch video data
        url = f'{base_url}search?part=id&channelId={channel_id}&maxResults=50&order=viewCount&type=video&key={api_key}'

        if next_page_token:
            url += f'&pageToken={next_page_token}'

        response = requests.get(url).json()

        # Check if 'items' is present in response
        if 'items' in response:
            for item in response['items']:
                video_id = item['id']['videoId']

                # Fetch individual video data
                url = f'{base_url}videos?part=snippet,statistics&id={video_id}&key={api_key}'
                video_data = requests.get(url).json()

                # Check if 'items' is present in video_data
                if 'items' in video_data:
                    for video_item in video_data['items']:
                        if 'shortDescription' in video_item['snippet'] and video_item['snippet']['shortDescription'] == "#shorts":
                            continue

                        Video.objects.update_or_create(
                            id=video_item['id'],
                            defaults={
                                'title': video_item['snippet']['title'],
                                'views': video_item['statistics'].get('viewCount', 0),
                                'likes': video_item['statistics'].get('likeCount', 0),
                                'comments': video_item['statistics'].get('commentCount', 0),
                                'channel': channel,
                            }
                        )
                    print('Video data updated!')

                    # Update most viewed videos
                    most_viewed_videos = Video.objects.filter(
                        channel=channel).order_by('-views')[:10]

                    channel.most_viewed_videos.clear()  # clear any existing relationships
                    channel.most_viewed_videos.add(
                        *most_viewed_videos)  # add new ones
                    print(channel.most_viewed_videos.all())

                    # Update most liked videos
                    most_liked_videos = Video.objects.filter(
                        channel=channel).order_by('-likes')[:10]

                    channel.most_likes_videos.clear()  # clear any existing relationships
                    channel.most_likes_videos.add(
                        *most_liked_videos)  # add new ones

                else:
                    print(
                        f"video_data did not contain 'items'. video_data: {video_data}")

        else:
            print(f"Response did not contain 'items'. Response: {response}")
            break  # break the while loop

        next_page_token = response.get('nextPageToken')

        if not next_page_token:
            break


def fetch_comment_data(channel_id):
    from .models import Channel, Video, Comment

    channel = Channel.objects.get(id=channel_id)

    # Fetch comment data for each video
    for video in Video.objects.filter(channel=channel):
        url = f'{base_url}commentThreads?part=snippet&videoId={video.id}&maxResults=5&key={api_key}'
        response = requests.get(url).json()

        if 'items' in response:    # Check if 'items' is present in response
            for item in response['items']:
                if 'replies' in item:
                    replies = item['snippet']['totalReplyCount']
                else:
                    replies = 0

                Comment.objects.update_or_create(
                    id=item['id'],
                    defaults={
                        'text': item['snippet']['topLevelComment']['snippet'].get('textDisplay', ''),
                        'likes': item['snippet']['topLevelComment']['snippet'].get('likeCount', 0),
                        'replies': replies,
                        'video': video,
                    }
                )
            print('Comment data updated!')
        else:
            print(
                f"No 'items' in the response for video {video.id}. Response: {response}")
