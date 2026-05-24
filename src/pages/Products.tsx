import { useState } from 'react';
import Loading from '../components/ui/Loading';
import { useFetch } from '../hooks/useFetch';
import type { ProductInterface } from '../types/Product.interface';
import { API_ITEMS_PER_PAGE_LIMIT, generateMockProducts } from '../utils/mockapi';
import './Products.css';
import Product from '../components/products/Product';
import AddProductButton from '../components/AddProductButton';

const Products = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [reload, setReload] = useState('0');
  const { data: products, error, isLoading } = useFetch<ProductInterface>(generateMockProducts(page, name), undefined, reload);

  return (
    <div>
      <h1>Products</h1>

      <div className='products-filter'>
        <input
          type="text"
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <AddProductButton />

      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}

      <div>
        <div className='pagination'>
          <button disabled={page === 1} onClick={() => setPage((prevState) => prevState - 1)}>Prev</button>
          <button disabled={products.length < API_ITEMS_PER_PAGE_LIMIT} onClick={() => setPage((prevState) => prevState + 1)}>Next</button>
        </div>

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
