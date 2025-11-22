import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import operationSlice from './slices/operationSlice';
import dashboardSlice from './slices/dashboardSlice';
import warehouseSlice from './slices/warehouseSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    operations: operationSlice,
    dashboard: dashboardSlice,
    warehouses: warehouseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;