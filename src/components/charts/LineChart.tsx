import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface LineChartProps {
  data: any[];
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({ data, height = 300 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      style={{ height }}
    >
      <ResponsiveContainer>
        <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => format(new Date(value), 'HH:mm')}
            stroke="#6b7280"
          />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            labelFormatter={(value) => format(new Date(value), 'MMM d, HH:mm')}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8, fill: '#4f46e5' }}
            animationDuration={1500}
          />
          {data[0]?.success !== undefined && (
            <Line
              type="monotone"
              dataKey="success"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, fill: '#16a34a' }}
              animationDuration={1500}
            />
          )}
          {data[0]?.failed !== undefined && (
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, fill: '#dc2626' }}
              animationDuration={1500}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};