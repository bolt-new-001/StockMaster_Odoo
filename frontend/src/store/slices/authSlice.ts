import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  warehouseStaff: User[];
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  warehouseStaff: [
    {
      id: '2',
      email: 'staff1@company.com',
      name: 'Rahul Kumar',
      role: 'warehouse_staff',
      createdBy: '1',
      isActive: true,
      createdAt: '2025-01-01',
    },
    {
      id: '3',
      email: 'staff2@company.com',
      name: 'Priya Sharma',
      role: 'warehouse_staff',
      createdBy: '1',
      isActive: true,
      createdAt: '2025-01-01',
    }
  ],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    addWarehouseStaff: (state, action: PayloadAction<User>) => {
      state.warehouseStaff.push(action.payload);
    },
    updateWarehouseStaff: (state, action: PayloadAction<User>) => {
      const index = state.warehouseStaff.findIndex(staff => staff.id === action.payload.id);
      if (index !== -1) {
        state.warehouseStaff[index] = action.payload;
      }
    },
    deleteWarehouseStaff: (state, action: PayloadAction<string>) => {
      state.warehouseStaff = state.warehouseStaff.filter(staff => staff.id !== action.payload);
    },
  },
});

export const { 
  setLoading, 
  setError, 
  loginSuccess, 
  logout, 
  clearError,
  addWarehouseStaff,
  updateWarehouseStaff,
  deleteWarehouseStaff
} = authSlice.actions;
export default authSlice.reducer;