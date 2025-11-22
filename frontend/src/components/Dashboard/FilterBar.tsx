import React from 'react';
import { Filter, Calendar } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Filter className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>
        
        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Document Type</option>
          <option value="receipts">Receipts</option>
          <option value="delivery">Delivery</option>
          <option value="internal">Internal</option>
          <option value="adjustments">Adjustments</option>
        </select>
        
        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Status</option>
          <option value="draft">Draft</option>
          <option value="waiting">Waiting</option>
          <option value="ready">Ready</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
        
        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Warehouse</option>
          <option value="main">Main Warehouse</option>
          <option value="production">Production Floor</option>
        </select>
        
        <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="">Category</option>
          <option value="raw-materials">Raw Materials</option>
          <option value="furniture">Furniture</option>
          <option value="electronics">Electronics</option>
        </select>
        
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="mx-2 text-gray-500">to</span>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
};