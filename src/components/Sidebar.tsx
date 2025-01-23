import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Users, 
  Settings,
  BarChart,
  Share2
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Database, label: 'Datasets' },
  { icon: BarChart, label: 'Analytics' },
  { icon: Users, label: 'Team' },
  { icon: Share2, label: 'Share' },
  { icon: Settings, label: 'Settings' }
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col shadow-xl">
      <div className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold">AGI Corp Analytics</h2>
      </div>
      
      <nav className="flex-1 px-2 md:px-4">
        <ul className="space-y-1 md:space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className={`flex items-center space-x-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-sm md:text-base transition-colors ${
                  item.active 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};