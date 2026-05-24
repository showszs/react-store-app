import { useState } from 'react';
import axios from 'axios';
import type { ProductInterface } from '../types/Product.interface';

export const useAdd = (url: string) => {
  const [error, setError] = useState<string | null>(null);

  const add = async (product: Partial<ProductInterface>) => {
    try {
      const response = await axios.post(url, product);
      return response.data;
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return {
    add,
    error,
  };
};
