import React, { useState } from 'react';
import { Dataset } from '../types';
import { format } from 'date-fns';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { RefreshCw, Filter, ChevronDown, Map, BarChart as BarChartIcon, LineChart as LineChartIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart } from './charts/LineChart';
import { BarChart } from './charts/BarChart';

interface DatasetCardProps {
  dataset: Dataset;
  onDrillDown?: (dataset: Dataset) => void;
}

export const DatasetCard: React.FC<DatasetCardProps> = ({ dataset: initialDataset, onDrillDown }) => {
  const dataset = useRealTimeData(initialDataset);
  const [timeRange, setTimeRange] = useState<'1h' | '1d' | '1w' | '1m'>('1d');
  const [isFiltering, setIsFiltering] = useState(false);
  const [minValue, setMinValue] = useState<number | ''>('');
  const [maxValue, setMaxValue] = useState<number | ''>('');
  const [chartType, setChartType] = useState<'line' | 'bar'>(dataset.type === 'bar' ? 'bar' : 'line');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const filteredData = dataset.dataPoints.filter(point => {
    if (minValue !== '' && point.value < Number(minValue)) return false;
    if (maxValue !== '' && point.value > Number(maxValue)) return false;
    if (selectedRegion && point.region !== selectedRegion) return false;
    return true;
  });

  const handleDrillDown = () => {
    if (onDrillDown) {
      onDrillDown(dataset);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base md:text-lg font-semibold text-gray-900"
          >
            {dataset.name}
          </motion.h3>
          <p className="text-xs md:text-sm text-gray-500">{dataset.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-4 w-4 text-indigo-600 animate-spin" />
          <span className="text-xs text-gray-500">
            Live: {format(new Date(dataset.lastUpdated), 'HH:mm:ss')}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 md:gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {['1h', '1d', '1w', '1m'].map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(range as any)}
              className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition-colors ${
                timeRange === range
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range}
            </motion.button>
          ))}
        </div>

        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('line')}
            className={`p-1.5 md:p-2 rounded-full ${
              chartType === 'line'
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LineChartIcon className="h-3 w-3 md:h-4 md:w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChartType('bar')}
            className={`p-1.5 md:p-2 rounded-full ${
              chartType === 'bar'
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BarChartIcon className="h-3 w-3 md:h-4 md:w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFiltering(!isFiltering)}
            className={`p-1.5 md:p-2 rounded-full ${
              isFiltering
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Filter className="h-3 w-3 md:h-4 md:w-4" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isFiltering && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="bg-gray-50 rounded-lg p-3 md:p-4 space-y-3 md:space-y-4">
              <div className="flex flex-col md:flex-row gap-3 md:space-x-4">
                <div className="flex-1">
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">Min Value</label>
                  <input
                    type="number"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 border rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">Max Value</label>
                  <input
                    type="number"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 border rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {dataset.regions && (
                <div>
                  <label className="block text-xs md:text-sm text-gray-600 mb-1">Region</label>
                  <select
                    value={selectedRegion || ''}
                    onChange={(e) => setSelectedRegion(e.target.value || null)}
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 border rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">All Regions</option>
                    {dataset.regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-48 sm:h-64 md:h-80 mb-4 md:mb-8">
        {chartType === 'line' ? (
          <LineChart data={filteredData} height={280} />
        ) : (
          <BarChart data={filteredData} height={280} />
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDrillDown}
        className="w-full py-1.5 md:py-2 px-3 md:px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:from-indigo-700 hover:to-purple-700 transition-all text-sm md:text-base"
      >
        <span>Drill Down</span>
        <ChevronDown className="h-4 w-4" />
      </motion.button>
    </motion.div>
  );
};