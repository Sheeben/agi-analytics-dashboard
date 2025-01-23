import React from 'react';
import { BarChart3, Bell, Settings, User } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 md:space-x-4">
          <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-indigo-600" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full">
            <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          </button>
          <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full">
            <Settings className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
          </button>
          <button className="flex items-center space-x-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <User className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
            <span className="text-xs md:text-sm font-medium text-gray-700">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};