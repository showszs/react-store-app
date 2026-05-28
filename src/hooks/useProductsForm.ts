import { useCallback, useState } from 'react';
import type { ProductInterface } from '../types/Product.interface';

const useProductsForm = (
  apiFunction: (data: ProductInterface) => Promise<ProductInterface>,
  onSuccess?: () => void,
) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (data: ProductInterface) => {
      try {
        const result = await apiFunction(data);
        console.log(result);
        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        setError((error as Error).message);
      }
    },
    [apiFunction, onSuccess],
  );
  return { handleSubmit, error };
};

export default useProductsForm;
