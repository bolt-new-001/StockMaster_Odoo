import React from 'react';
import { CheckSquare, Clock, Package, ArrowDownToLine, ArrowUpFromLine, AlertTriangle } from 'lucide-react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/slices/warehouseSlice';

export const WarehouseDashboard: React.FC = () => {
  const { tasks, staffStats } = useTypedSelector((state) => state.warehouses);
  const { user } = useTypedSelector((state) => state.auth);
  const dispatch = useDispatch();

  const myTasks = tasks.filter(task => task.assignedTo === user?.id);
  const pendingTasks = myTasks.filter(task => task.status === 'pending');
  const inProgressTasks = myTasks.filter(task => task.status === 'in_progress');

  const handleTaskAction = (taskId: string, newStatus: 'in_progress' | 'completed') => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      dispatch(updateTask({ ...task, status: newStatus }));
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

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'receive': return <ArrowDownToLine className="w-5 h-5 text-green-600" />;
      case 'pick': return <ArrowUpFromLine className="w-5 h-5 text-blue-600" />;
      case 'pack': return <Package className="w-5 h-5 text-purple-600" />;
      case 'transfer': return <ArrowDownToLine className="w-5 h-5 text-orange-600" />;
      case 'count': return <CheckSquare className="w-5 h-5 text-indigo-600" />;
      default: return <CheckSquare className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's what needs your attention today</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{pendingTasks.length}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{inProgressTasks.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <CheckSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{staffStats.completedToday}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <CheckSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receipts to Process</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{staffStats.receiptsToProcess}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <ArrowDownToLine className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deliveries to Pick</p>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{staffStats.deliveriesToPick}</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100">
              <ArrowUpFromLine className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Priority Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">High Priority Tasks</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {myTasks.filter(task => task.priority === 'high').length > 0 ? (
                myTasks.filter(task => task.priority === 'high').map((task) => (
                  <div key={task.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getTaskIcon(task.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex items-center mt-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                              {task.priority} priority
                            </span>
                            <span className="text-xs text-gray-500 ml-3">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {task.status === 'pending' && (
                          <button
                            onClick={() => handleTaskAction(task.id, 'in_progress')}
                            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                          >
                            Start
                          </button>
                        )}
                        {task.status === 'in_progress' && (
                          <button
                            onClick={() => handleTaskAction(task.id, 'completed')}
                            className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No high priority tasks</p>
              )}
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Today's Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {myTasks.length > 0 ? (
                myTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getTaskIcon(task.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          <div className="flex items-center mt-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                              task.status === 'completed' ? 'bg-green-100 text-green-800' :
                              task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {task.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {task.status === 'pending' && (
                          <button
                            onClick={() => handleTaskAction(task.id, 'in_progress')}
                            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                          >
                            Start
                          </button>
                        )}
                        {task.status === 'in_progress' && (
                          <button
                            onClick={() => handleTaskAction(task.id, 'completed')}
                            className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-md hover:bg-green-200"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No tasks assigned</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowDownToLine className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Quick Receive</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowUpFromLine className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Quick Pick</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Package className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Pack Orders</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CheckSquare className="w-8 h-8 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Stock Count</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};