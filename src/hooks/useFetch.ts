import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const response = await axios.get<T[]>(url);

        if (response.status !== 200) {
          throw new Error(`Error: Request failed with status code: ${response.status}`);
        }

        setData(response.data as T[]);
      } catch (error) {
        setError(`Error fetching data: ${(error as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
};
