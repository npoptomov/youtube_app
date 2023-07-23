// CustomTooltip.js
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', border: '1px solid #ccc', padding: '10px', borderRadius: '5px'}}>
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
          <p className="intro">{`Likes : ${payload[0].payload.likes}`}</p>
          <p className="intro">{`Comments : ${payload[0].payload.comments}`}</p>
        </div>
      );
    }
  
    return null;
  };

export default CustomTooltip;