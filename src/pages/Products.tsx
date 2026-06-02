import { useEffect, useState, useRef } from 'react';
import Loading from '../components/ui/Loading';
import { generateMockProducts } from '../utils/mockapi';
import styles from './Products.module.css';
import Product from '../components/products/Product';
import AddProductButton from '../components/AddProductButton';
import type { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, selectProductError, selectProductLoading, selectProducts } from '../redux/slices/productsSlice';
import { debounce } from '../utils/debounce';
import { selectIsLogged } from '../redux/slices/authSlice';
import Pagination from '../components/ui/Pagination';

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
    window.scrollTo({ top: 0, behavior: "smooth" })
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

        <ul className={styles.list}>
          {products.length > 0 ? products.map((product) => (
            <Product key={product.id} product={product} reload={() => setReload(product.id)} />
          )) : !isLoading && <p className={styles.empty}>No products found.</p>}
        </ul>
        {products.length > 0 && !error && <Pagination page={page} setPage={setPage} />}
      </div>
    </div>
  );
};
export default Products;
