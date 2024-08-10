
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function MarketTrend() {
  const [data, setData] = useState([]);

  const fetchMarketData = useCallback(async () => {
    try {
      const response = await axios.get('/api/market-data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Market Trend',
        data: data.map(item => item.value),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2>Market Trend</h2>
      <Line data={chartData} />
    </div>
  );
}

export default MarketTrend;
