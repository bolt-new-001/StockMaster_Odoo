import React, { useState } from 'react';
import { CheckSquare, Clock, ArrowDownToLine, ArrowUpFromLine, Package, Clipboard, Filter } from 'lucide-react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/slices/warehouseSlice';

export const MyTasks: React.FC = () => {
  const { tasks } = useTypedSelector((state) => state.warehouses);
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    status: 'all',
    type: 'all',
    priority: 'all',
  });

  const myTasks = tasks.filter(task => task.assignedTo === user?.id);

  const filteredTasks = myTasks.filter(task => {
    const statusMatch = filter.status === 'all' || task.status === filter.status;
    const typeMatch = filter.type === 'all' || task.type === filter.type;
    const priorityMatch = filter.priority === 'all' || task.priority === filter.priority;
    return statusMatch && typeMatch && priorityMatch;
  });

  const handleTaskAction = (taskId: string, newStatus: 'in_progress' | 'completed') => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      dispatch(updateTask({ ...task, status: newStatus }));
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'receive': return <ArrowDownToLine className="w-5 h-5 text-green-600" />;
      case 'pick': return <ArrowUpFromLine className="w-5 h-5 text-blue-600" />;
      case 'pack': return <Package className="w-5 h-5 text-purple-600" />;
      case 'transfer': return <ArrowDownToLine className="w-5 h-5 text-orange-600" />;
      case 'count': return <Clipboard className="w-5 h-5 text-indigo-600" />;
      default: return <CheckSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = myTasks.filter(t => t.status === 'pending').length;
  const inProgressCount = myTasks.filter(t => t.status === 'in_progress').length;
  const completedCount = myTasks.filter(t => t.status === 'completed').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600">Manage your assigned warehouse tasks</p>
        </div>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <CheckSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckSquare className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
            </div>
          </div>
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
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <select 
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Types</option>
            <option value="receive">Receive</option>
            <option value="pick">Pick</option>
            <option value="pack">Pack</option>
            <option value="transfer">Transfer</option>
            <option value="count">Count</option>
          </select>
          
          <select 
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="mr-4 mt-1">
                        {getTaskIcon(task.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <div className="flex items-center mt-3 space-x-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                            {task.priority} priority
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                            {task.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                          {task.relatedDocumentType && (
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {task.relatedDocumentType}: {task.relatedDocumentId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {task.status === 'pending' && (
                        <button
                          onClick={() => handleTaskAction(task.id, 'in_progress')}
                          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          Start Task
                        </button>
                      )}
                      {task.status === 'in_progress' && (
                        <button
                          onClick={() => handleTaskAction(task.id, 'completed')}
                          className="px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                      {task.status === 'completed' && (
                        <span className="px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-md">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900 mb-1">No tasks found</h3>
                <p className="text-sm text-gray-500">Try adjusting your filters or check back later for new tasks.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};