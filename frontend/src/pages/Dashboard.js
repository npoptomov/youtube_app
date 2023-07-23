// Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthWrapper';
import useFetchData from '../hooks/useFetchData';
import ControlPanel from '../components/ControlPanel';
import ChannelData from '../components/ChannelData';
import BarChart from '../components/BarChartComponent';
import LineChart from '../components/LineChartComponent';
import { Container } from '../styles';

const Dashboard = () => {
  const { token, setIsLoggedIn } = useAuth();
  const storedChannelId = localStorage.getItem('channelId') || "UCneDIDdPqOmXm7K42B1hV5A";
  const [channelId, setChannelId] = useState(storedChannelId);
  const [inputChannelId, setInputChannelId] = useState(''); 
  const { data, mostViewedVideos, mostLikedVideos, channelHistory, videoHistory } = useFetchData(channelId, token);
  const navigate = useNavigate();

  if (!data) {
    return <p>Loading...</p>;
  }

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  // Function to handle channelId input change
  const handleInputChange = (event) => {
    setInputChannelId(event.target.value);
  };

  // Function to handle Fetch button click
  const handleFetchData = () => {
    setChannelId(inputChannelId);
    localStorage.setItem('channelId', inputChannelId); // set channelId in localStorage
  };

  return (
    <Container>
      <ControlPanel handleInputChange={handleInputChange} handleFetchData={handleFetchData} handleLogout={handleLogout} />
      <ChannelData data={data} />
      <BarChart data={mostViewedVideos} title="Top 10 Most Viewed Videos" dataKey="views" navigate={navigate} barColor="#8884d8" />
      <BarChart data={mostLikedVideos} title="Top 10 Most Liked Videos" dataKey="likes" navigate={navigate} barColor="#82ca9d" />
      <LineChart data={channelHistory} title="Channel Subscriber History" dataKey="subscribers" lineColor="#82ca9d" />
      <LineChart data={videoHistory} title="Most Viewed Video Comment History" dataKey="comments" lineColor="#8884d8" />
    </Container>
  );
};

export default Dashboard;
