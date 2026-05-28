import axios from 'axios';
import type { ProductInterface } from '../types/Product.interface';

export const useAdd = (url: string) => {
  const add = async (product: Partial<ProductInterface>) => {
    try {
      const response = await axios.post(url, product);
      return response.data;
    } catch (error) {
      console.error(`Error adding product: ${(error as Error).message}`);
      throw new Error(`Failed to add product: ${(error as Error).message}`);
    }
  };

  return { add };
};
