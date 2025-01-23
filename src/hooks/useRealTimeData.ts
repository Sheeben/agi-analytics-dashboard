import { useState, useEffect } from 'react';
import type { Dataset } from '../types';

// Simulates real-time data updates
export function useRealTimeData(initialDataset: Dataset) {
  const [data, setData] = useState(initialDataset);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        lastUpdated: new Date().toISOString(),
        dataPoints: [
          ...prevData.dataPoints.slice(1),
          {
            date: new Date().toISOString(),
            value: Math.floor(Math.random() * 100) + 50,
            category: prevData.dataPoints[0].category
          }
        ]
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return data;
}