// useFetchData.js
import { useState, useEffect } from 'react';
import { fetchChannelData, fetchVideoData, fetchChannelHistory, fetchVideoHistory, formatDate } from '../services/dataService';

const useFetchData = (channelId, token) => {
  const [data, setData] = useState(null);
  const [mostViewedVideos, setMostViewedVideos] = useState([]);
  const [mostLikedVideos, setMostLikedVideos] = useState([]);
  const [channelHistory, setChannelHistory] = useState([]);
  const [videoHistory, setVideoHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchChannelData(channelId, token);

      setData(result);

      // Fetch the data for the top 10 most viewed videos
      const mostViewedVideosData = await Promise.all(result.most_viewed_videos.map(videoId => fetchVideoData(videoId, token)));
      setMostViewedVideos(mostViewedVideosData);

      // Fetch the data for the top 10 most liked videos
      const mostLikedVideosData = await Promise.all(result.most_likes_videos.map(videoId => fetchVideoData(videoId, token)));
      setMostLikedVideos(mostLikedVideosData);

      // Fetch channel history data
      const channelHistoryData = (await fetchChannelHistory(channelId, token)).map(item => ({
        ...item,
        change_date: formatDate(item.change_date),
      }));
      setChannelHistory(channelHistoryData);

      // Fetch video history data for the most viewed video
      if (mostViewedVideosData.length > 0) {
        const videoHistoryData = (await fetchVideoHistory(mostViewedVideosData[0].id, token)).map(item => ({
          ...item,
          change_date: formatDate(item.change_date),
        }));
        setVideoHistory(videoHistoryData);
      }
    };
    if (channelId) {
      fetchData();
    }
  }, [channelId, token]);

  return { data, mostViewedVideos, mostLikedVideos, channelHistory, videoHistory };
};

export default useFetchData;
