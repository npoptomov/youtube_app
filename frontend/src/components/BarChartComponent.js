import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Title } from '../styles';
import CustomTooltip from './CustomTooltip';

const BarChartComponent = ({ data, title, navigate }) => {

  const shortenTitle = (title, maxLength) => {
    if (title.length <= maxLength) return title;
    return `${title.slice(0, maxLength)}...`;
  };

  const CustomizedAxisTick = ({ x, y, payload }) => {
    const maxLength = 22;
    const shortTitle = shortenTitle(payload.value, maxLength);

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" style={{ fontSize: '10px' }}>
          {shortTitle}
        </text>
      </g>
    );
  };

  return (
    <>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" tick={<CustomizedAxisTick />} interval={0} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="views" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                onClick={() => navigate(`/videos/${entry.id}`)}
                cursor="pointer"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BarChartComponent;
