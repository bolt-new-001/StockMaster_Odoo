import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
}

const initialState: ProductState = {
  products: [
    {
      id: '1',
      name: 'Steel Rods',
      sku: 'STL-001',
      category: 'Raw Materials',
      unitOfMeasure: 'kg',
      currentStock: 100,
      minStock: 20,
      maxStock: 500,
      cost: 25.50,
      location: 'Main Warehouse',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
    },
    {
      id: '2',
      name: 'Office Chairs',
      sku: 'CHR-001',
      category: 'Furniture',
      unitOfMeasure: 'pcs',
      currentStock: 15,
      minStock: 10,
      maxStock: 100,
      cost: 150.00,
      location: 'Main Warehouse',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
    },
    {
      id: '3',
      name: 'Laptop Stand',
      sku: 'LPS-001',
      category: 'Electronics',
      unitOfMeasure: 'pcs',
      currentStock: 5,
      minStock: 10,
      maxStock: 50,
      cost: 45.00,
      location: 'Main Warehouse',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
    }
  ],
  isLoading: false,
  error: null,
  searchTerm: '',
  selectedCategory: 'all',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  setSearchTerm,
  setSelectedCategory,
} = productSlice.actions;

export default productSlice.reducer;