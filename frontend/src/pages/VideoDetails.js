// VideoDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoData } from '../services/dataService';
import { useAuth } from '../components/AuthWrapper';
import Comments from '../components/Comments';
import { Container, Title, Stat } from '../styles';

const VideoDetails = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetchVideoData(id, token)
      .then((data) => {
        setVideoData(data);
      })
      .catch((error) => {
        console.error('Error fetching video data: ', error);
      }); 
  }, [id, token]);

  if (!videoData) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Title>{videoData.title}</Title>
      <Stat>Views: {videoData.views}</Stat>
      <Stat>Likes: {videoData.likes}</Stat>
      <Stat>Comments: {videoData.comments}</Stat>

      <Comments videoId={id} token={token} />
    </Container>
  );
};

export default VideoDetails;