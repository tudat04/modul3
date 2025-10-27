import axios from 'axios';
import type { Product } from '../types/Product';

const API_URL = 'http://localhost:3000/products';

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await axios.post<Product>(API_URL, product);
    return response.data;
  },

  updateProduct: async (id: number, product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await axios.put<Product>(`${API_URL}/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};
