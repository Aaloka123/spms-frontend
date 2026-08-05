// Matches backend ProductResponseDTO
export interface Product {
  id: number;
  productName: string;
  genericName?: string;
  brand?: string;
  dosageForm?: string;
  strength?: string;
  purchasePrice?: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel?: number;
  expiryDate?: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
}
