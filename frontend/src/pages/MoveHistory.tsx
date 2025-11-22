import React, { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, RotateCcw, TrendingUp, Filter, Calendar } from 'lucide-react';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const MoveHistory: React.FC = () => {
  const { movements } = useTypedSelector((state) => state.operations);
  const [filter, setFilter] = useState({
    type: 'all',
    dateRange: 'all',
    product: '',
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'receipt': return <ArrowDownToLine className="w-4 h-4 text-green-600" />;
      case 'delivery': return <ArrowUpFromLine className="w-4 h-4 text-blue-600" />;
      case 'transfer': return <RotateCcw className="w-4 h-4 text-purple-600" />;
      case 'adjustment': return <TrendingUp className="w-4 h-4 text-orange-600" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'receipt': return 'bg-green-100 text-green-800';
      case 'delivery': return 'bg-blue-100 text-blue-800';
      case 'transfer': return 'bg-purple-100 text-purple-800';
      case 'adjustment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMovements = movements.filter(movement => {
    const typeMatch = filter.type === 'all' || movement.type === filter.type;
    const productMatch = !filter.product || 
      movement.productName.toLowerCase().includes(filter.product.toLowerCase()) ||
      movement.productSku.toLowerCase().includes(filter.product.toLowerCase());
    return typeMatch && productMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Move History</h1>
        <div className="text-sm text-gray-500">
          Total movements: {filteredMovements.length}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select 
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Types</option>
            <option value="receipt">Receipts</option>
            <option value="delivery">Deliveries</option>
            <option value="transfer">Transfers</option>
            <option value="adjustment">Adjustments</option>
          </select>
          
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={filter.product}
            onChange={(e) => setFilter({ ...filter, product: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
          
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movement History Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMovements.length > 0 ? (
                filteredMovements.map((movement) => (
                  <tr key={movement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${getTypeColor(movement.type).replace('text-', 'bg-').replace('-800', '-100')}`}>
                          {getTypeIcon(movement.type)}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(movement.type)}`}>
                          {movement.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {movement.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{movement.productName}</div>
                        <div className="text-sm text-gray-500">{movement.productSku}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-bold ${
                        movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {movement.fromLocation && movement.toLocation ? (
                        <div>
                          <div>{movement.fromLocation}</div>
                          <div className="text-xs text-gray-500">→ {movement.toLocation}</div>
                        </div>
                      ) : (
                        movement.toLocation || movement.fromLocation || '-'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(movement.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(movement.status)}`}>
                        {movement.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {movement.supplier && `Supplier: ${movement.supplier}`}
                      {movement.customer && `Customer: ${movement.customer}`}
                      {movement.notes && movement.notes}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center">
                      <RotateCcw className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-sm font-medium text-gray-900 mb-1">No movements found</h3>
                      <p className="text-sm text-gray-500">Try adjusting your filters or create some stock movements.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};