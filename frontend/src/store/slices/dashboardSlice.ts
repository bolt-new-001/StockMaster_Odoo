import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardStats, FilterOptions } from '../../types';

interface DashboardState {
  stats: DashboardStats;
  filters: FilterOptions;
  isLoading: boolean;
}

const initialState: DashboardState = {
  stats: {
    totalProducts: 3,
    lowStockItems: 1,
    outOfStockItems: 0,
    pendingReceipts: 1,
    pendingDeliveries: 1,
    scheduledTransfers: 0,
  },
  filters: {
    documentType: [],
    status: [],
    warehouse: [],
    category: [],
  },
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setStats, setFilters, setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;