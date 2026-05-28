import axios from 'axios';
import type { ProductInterface } from '../types/Product.interface';

export const useUpdate = (url: string) => {
  const update = async (product: Partial<ProductInterface>) => {
    try {
      const response = await axios.put(`${url}/${product.id}`, product);
      return response.data;
    } catch (error) {
      console.error(`Error updating product: ${(error as Error).message}`);
      throw new Error(`Failed to update product: ${(error as Error).message}`);
    }
  };

  return { update };
};
