import { useState } from 'react';
import axios from 'axios';
import type { ProductInterface } from '../types/Product.interface';

export const useUpdate = (url: string) => {
  const [error, setError] = useState<string | null>(null);

  const update = async (product: Partial<ProductInterface>) => {
    try {
      const response = await axios.put(`${url}/${product.id}`, product);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
      throw error;
    }
  };

  return {
    update,
    error,
  };
};
