import axios from 'axios';
import { useState } from 'react';

export const useDelete = (url: string) => {
  const [error, setError] = useState<string | null>(null);
  const del = async (id: string) => {
    try {
      await axios.delete(`${url}/${id}`);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return {
    delete: del,
    error,
  };
};
