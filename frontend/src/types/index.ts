export interface User {
  id: string;
  email: string;
  name: string;
  role: 'inventory_manager' | 'warehouse_staff';
  createdBy?: string; // For warehouse staff created by manager
  isActive: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unitOfMeasure: string;
  currentStock: number;
  minStock?: number;
  maxStock?: number;
  cost?: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: string;
  isActive: boolean;
}

export interface StockMovement {
  id: string;
  type: 'receipt' | 'delivery' | 'adjustment' | 'transfer';
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  fromLocation?: string;
  toLocation?: string;
  reference: string;
  status: 'draft' | 'waiting' | 'ready' | 'done' | 'canceled';
  date: string;
  supplier?: string;
  customer?: string;
  notes?: string;
}

export interface Receipt {
  id: string;
  reference: string;
  supplier: string;
  status: 'draft' | 'waiting' | 'ready' | 'done' | 'canceled';
  date: string;
  items: ReceiptItem[];
  totalQuantity: number;
  notes?: string;
}

export interface ReceiptItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantityOrdered: number;
  quantityReceived: number;
  unitCost?: number;
}

export interface Delivery {
  id: string;
  reference: string;
  customer: string;
  status: 'draft' | 'waiting' | 'ready' | 'done' | 'canceled';
  date: string;
  items: DeliveryItem[];
  totalQuantity: number;
  notes?: string;
}

export interface DeliveryItem {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  quantityDemand: number;
  quantityDone: number;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockItems: number;
  outOfStockItems: number;
  pendingReceipts: number;
  pendingDeliveries: number;
  scheduledTransfers: number;
}

export interface WarehouseStaffStats {
  pendingTasks: number;
  completedToday: number;
  receiptsToProcess: number;
  deliveriesToPick: number;
  transfersPending: number;
}

export interface Task {
  id: string;
  type: 'receive' | 'pick' | 'pack' | 'transfer' | 'count';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string;
  dueDate: string;
  relatedDocumentId?: string;
  relatedDocumentType?: string;
}

export interface FilterOptions {
  documentType: string[];
  status: string[];
  warehouse: string[];
  category: string[];
  dateRange?: {
    start: string;
    end: string;
  };
}