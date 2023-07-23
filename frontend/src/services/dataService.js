// dataService.js
export const fetchChannelData = async (channelId, token) => {
    const response = await fetch(`/api/channel/${channelId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

export const fetchVideoData = async (videoId, token) => {
    const response = await fetch(`/api/videos/${videoId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

export const fetchChannelHistory = async (channelId, token) => {
    const response = await fetch(`/api/channel/${channelId}/history`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

export const fetchVideoHistory = async (videoId, token) => {
    const response = await fetch(`/api/videos/${videoId}/history`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
  }
