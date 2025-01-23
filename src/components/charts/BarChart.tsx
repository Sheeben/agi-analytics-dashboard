import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface BarChartProps {
  data: any[];
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, height = 300 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      style={{ height }}
    >
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          <Bar
            dataKey="value"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          {data[0]?.success !== undefined && (
            <Bar
              dataKey="success"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          )}
          {data[0]?.failed !== undefined && (
            <Bar
              dataKey="failed"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          )}
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};