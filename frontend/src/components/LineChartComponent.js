// LineChartComponent.js
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Title } from '../styles';

const LineChartComponent = ({ data, title, dataKey }) => {
  const CustomizedAxisTick = ({ x, y, payload }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" style={{ fontSize: '12px' }}>
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="change_date" tick={<CustomizedAxisTick />} interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartComponent;
