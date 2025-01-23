import React, { useState } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { Sidebar } from './components/Sidebar';
import { DatasetCard } from './components/DatasetCard';
import type { Dataset } from './types';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

// Enhanced sample data with more details
const initialDatasets: Dataset[] = [
  {
    id: '1',
    name: 'Research Data Analysis',
    description: 'Monthly research output metrics',
    type: 'line',
    lastUpdated: new Date().toISOString(),
    regions: ['North America', 'Europe', 'Asia'],
    categories: ['Publications', 'Citations', 'Patents'],
    dataPoints: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 60000).toISOString(),
      value: Math.floor(Math.random() * 100) + 50,
      success: Math.floor(Math.random() * 50) + 30,
      failed: Math.floor(Math.random() * 20) + 5,
      category: 'research',
      region: ['North America', 'Europe', 'Asia'][Math.floor(Math.random() * 3)],
      subCategory: ['Publications', 'Citations', 'Patents'][Math.floor(Math.random() * 3)]
    }))
  },
  {
    id: '2',
    name: 'Clinical Trials Progress',
    description: 'Patient enrollment and trial milestones',
    type: 'bar',
    lastUpdated: new Date().toISOString(),
    regions: ['USA', 'EU', 'Asia-Pacific'],
    categories: ['Phase 1', 'Phase 2', 'Phase 3'],
    dataPoints: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 60000).toISOString(),
      value: Math.floor(Math.random() * 80) + 20,
      success: Math.floor(Math.random() * 40) + 20,
      failed: Math.floor(Math.random() * 15) + 5,
      category: 'clinical',
      region: ['USA', 'EU', 'Asia-Pacific'][Math.floor(Math.random() * 3)],
      subCategory: ['Phase 1', 'Phase 2', 'Phase 3'][Math.floor(Math.random() * 3)]
    }))
  },
  {
    id: '3',
    name: 'Data Integration Metrics',
    description: 'System performance and integration status',
    type: 'line',
    lastUpdated: new Date().toISOString(),
    regions: ['Primary DC', 'Secondary DC', 'Edge Locations'],
    categories: ['Throughput', 'Latency', 'Error Rate'],
    dataPoints: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 60000).toISOString(),
      value: Math.floor(Math.random() * 90) + 40,
      success: Math.floor(Math.random() * 60) + 30,
      failed: Math.floor(Math.random() * 10) + 2,
      category: 'integration',
      region: ['Primary DC', 'Secondary DC', 'Edge Locations'][Math.floor(Math.random() * 3)],
      subCategory: ['Throughput', 'Latency', 'Error Rate'][Math.floor(Math.random() * 3)]
    }))
  }
];

function App() {
  const [datasets, setDatasets] = useState<Dataset[]>(initialDatasets);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleDrillDown = (dataset: Dataset) => {
    setSelectedDataset(dataset);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900 text-white"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar with responsive behavior */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative z-40 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 gap-6 mb-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AGI Corp Analytics Dashboard
                </h2>
                <p className="text-sm md:text-base text-gray-600 mt-2">
                  Monitor your research data, clinical trials, and integration metrics in real-time.
                  Use the interactive charts below to analyze trends and patterns.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
            >
              {datasets.map((dataset, index) => (
                <motion.div
                  key={dataset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * (index + 1) }}
                >
                  <DatasetCard
                    dataset={dataset}
                    onDrillDown={handleDrillDown}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;