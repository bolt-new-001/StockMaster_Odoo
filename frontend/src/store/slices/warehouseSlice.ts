import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Warehouse, Task, WarehouseStaffStats } from '../../types';

interface WarehouseState {
  warehouses: Warehouse[];
  tasks: Task[];
  staffStats: WarehouseStaffStats;
  isLoading: boolean;
  error: string | null;
}

const initialState: WarehouseState = {
  warehouses: [
    {
      id: '1',
      name: 'Main Warehouse',
      code: 'WH-001',
      address: '123 Industrial St, City',
      isActive: true,
    },
    {
      id: '2',
      name: 'Production Floor',
      code: 'WH-002',
      address: '124 Industrial St, City',
      isActive: true,
    },
  ],
  tasks: [
    {
      id: '1',
      type: 'receive',
      title: 'Process Steel Rods Receipt',
      description: 'Receive and verify 100 kg Steel Rods from Steel Corp Ltd',
      priority: 'high',
      status: 'pending',
      assignedTo: '2',
      dueDate: '2025-01-15',
      relatedDocumentId: '1',
      relatedDocumentType: 'receipt'
    },
    {
      id: '2',
      type: 'pick',
      title: 'Pick Office Chairs',
      description: 'Pick 10 office chairs for delivery to ABC Manufacturing',
      priority: 'medium',
      status: 'pending',
      assignedTo: '3',
      dueDate: '2025-01-16',
      relatedDocumentId: '1',
      relatedDocumentType: 'delivery'
    },
    {
      id: '3',
      type: 'count',
      title: 'Stock Count - Electronics',
      description: 'Perform physical count of electronics category',
      priority: 'low',
      status: 'in_progress',
      assignedTo: '2',
      dueDate: '2025-01-17'
    }
  ],
  staffStats: {
    pendingTasks: 3,
    completedToday: 2,
    receiptsToProcess: 1,
    deliveriesToPick: 1,
    transfersPending: 0,
  },
  isLoading: false,
  error: null,
};

const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addWarehouse: (state, action: PayloadAction<Warehouse>) => {
      state.warehouses.push(action.payload);
    },
    updateWarehouse: (state, action: PayloadAction<Warehouse>) => {
      const index = state.warehouses.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.warehouses[index] = action.payload;
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    setStaffStats: (state, action: PayloadAction<WarehouseStaffStats>) => {
      state.staffStats = action.payload;
    },
  },
});

export const { 
  setLoading, 
  setError, 
  addWarehouse, 
  updateWarehouse,
  addTask,
  updateTask,
  deleteTask,
  setStaffStats
} = warehouseSlice.actions;
export default warehouseSlice.reducer;