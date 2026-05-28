import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export function createFetchThunk<T>(typePrefix: string) {
  return createAsyncThunk<{ data: T[]; totalCount: number }, string, { rejectValue: string }>(
    typePrefix,
    async (url, { rejectWithValue }) => {
      try {
        const baseUrl = new URL(url);
        baseUrl.searchParams.delete('page');
        baseUrl.searchParams.delete('limit');

        const totalResponse = await axios.get<T[]>(baseUrl.toString());
        const totalCount = totalResponse.data.length;

        const response = await axios.get<T[]>(url);

        if (response.status !== 200) {
          return rejectWithValue('An error occurred');
        }
        return { data: response.data, totalCount };
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          return { data: [], totalCount: 0 };
        }
        console.error(axiosError.message);
        return rejectWithValue(axiosError.message || 'An unknown error occurred');
      }
    },
  );
}
