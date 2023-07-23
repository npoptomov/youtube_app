// ChannelData.js
import { Title } from '../styles';

const ChannelData = ({ data }) => {
  return (
    <>
      <Title>{data.title}</Title>
      <p>Views: {data.views}</p>
      <p>Subscribers: {data.subscribers}</p>
      <p>Number of videos: {data.video_count}</p>
    </>
  );
};

export default ChannelData;
