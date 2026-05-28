import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { fetchAllProducts } from '../redux/slices/productsSlice';
import { generateMockProducts } from '../utils/mockapi';

const useProductsFetch = (
  page: number,
  name: string,
  sort: string,
  order: string,
  reload: string,
) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllProducts(generateMockProducts(page, name, sort, order)));
  }, [dispatch, page, name, sort, order, reload]);
};

export default useProductsFetch;
