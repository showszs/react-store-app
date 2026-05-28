import { useEffect, useMemo, useState } from 'react';
import { loadProductsState } from '../utils/loadProductsState';

const useProductsState = () => {
  const initialState = useMemo(() => loadProductsState(), []);

  const [page, setPage] = useState(initialState.page);
  const [name, setName] = useState(initialState.name);
  const [sort, setSort] = useState(initialState.sort);
  const [order, setOrder] = useState(initialState.order);
  const [reload, setReload] = useState('0');

  useEffect(() => {
    localStorage.setItem('productsState', JSON.stringify({ page, name, sort, order }));
  }, [page, name, sort, order]);

  const resetFilters = () => {
    setName('');
    setSort('');
    setOrder('');
    setPage(1);
  };

  return {
    page,
    setPage,
    name,
    setName,
    sort,
    setSort,
    order,
    setOrder,
    reload,
    setReload,
    resetFilters,
  };
};

export default useProductsState;
