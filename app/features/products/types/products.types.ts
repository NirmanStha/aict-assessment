export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  isDeleted?: boolean;
}

export interface PaginatedProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateProductPayload {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

export interface UpdateProductPayload {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  stock?: number;
}
