import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = <T>(url: string, limit?: number) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const response = await axios.get<T[]>(limit ? `${url}?limit=${limit}` : url, {
          signal: controller.signal,
        });

        if (response.status !== 200) {
          throw new Error(`Status code: ${response.status}`);
        }
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          setError(`Error fetching data: ${(error as Error).message}`);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, limit]);

  return { data, error, isLoading };
};
