import { useEffect, useState, useRef } from 'react';
import Loading from '../components/ui/Loading';
import { API_ITEMS_PER_PAGE_LIMIT, generateMockProducts } from '../utils/mockapi';
import styles from './Products.module.css';
import Product from '../components/products/Product';
import AddProductButton from '../components/AddProductButton';
import type { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, selectProductError, selectProductLoading, selectProducts } from '../redux/slices/productsSlice';
import { debounce } from '../utils/debounce';
import { selectIsLogged } from '../redux/slices/authSlice';

const Products = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [reload, setReload] = useState('0');

  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const isLogged = useSelector(selectIsLogged)

  const debouncedFetch = useRef(
    debounce<[number, string]>((currentPage: number, currentName: string) => {
      dispatch(fetchAllProducts(generateMockProducts(currentPage, currentName)));
    }, 500)
  );

  useEffect(() => {
    debouncedFetch.current?.(page, name);
  }, [page, name, debouncedFetch, reload]);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.filter}>
          <input
            type="text"
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {isLogged && <AddProductButton className={styles.addButton} />}
      </div>

      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}

      <div>
        {products.length > 0 && !error && (
          <div className={styles.pagination}>
            <button className={styles.paginationButton} disabled={page === 1} onClick={() => setPage((prevState) => prevState - 1)}>Prev</button>
            <button className={styles.paginationButton} disabled={products.length < API_ITEMS_PER_PAGE_LIMIT} onClick={() => setPage((prevState) => prevState + 1)}>Next</button>
          </div>
        )}

        <ul className={styles.list}>
          {products.length > 0 ? products.map((product) => (
            <Product key={product.id} product={product} reload={() => setReload(product.id)} />
          )) : <p className={styles.empty}>No products found.</p>}
        </ul>
      </div>
    </div>
  );
};
export default Products;
