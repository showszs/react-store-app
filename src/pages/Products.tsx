import { useEffect, useState, useRef } from 'react';
import Loading from '../components/ui/Loading';
import { API_ITEMS_PER_PAGE_LIMIT, generateMockProducts } from '../utils/mockapi';
import './Products.css';
import Product from '../components/products/Product';
import AddProductButton from '../components/AddProductButton';
import type { AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, selectProductError, selectProductLoading, selectProducts } from '../redux/slices/productsSlice';
import { debounce } from '../utils/debounce';

const Products = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [reload, setReload] = useState('0');

  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);

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
      <div className='products-header'>
        <div className='products-filter'>
          <input
            type="text"
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <AddProductButton />
      </div>

      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}

      <div>
        {products.length > 0 && !error && (
          <div className='pagination'>
            <button disabled={page === 1} onClick={() => setPage((prevState) => prevState - 1)}>Prev</button>
            <button disabled={products.length < API_ITEMS_PER_PAGE_LIMIT} onClick={() => setPage((prevState) => prevState + 1)}>Next</button>
          </div>
        )}

        <ul className="products-list">
          {products.length > 0 ? products.map((product) => (
            <Product key={product.id} product={product} reload={() => setReload(product.id)} />
          )) : <p className='products-empty'>No products found.</p>}
        </ul>
      </div>
    </div>
  );
};
export default Products;
