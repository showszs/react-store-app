import { useState } from 'react';
import Loading from '../components/ui/Loading';
import { useFetch } from '../hooks/useFetch';
import type { ProductInterface } from '../types/Product.interface';
import { API_ITEMS_PER_PAGE_LIMIT, generateMockProducts } from '../utils/mockapi';
import './Products.css';
import Product from '../components/products/Product';



const Products = () => {
  const [page, setPage] = useState(1);
  const { data: products, error, isLoading } = useFetch<ProductInterface>(generateMockProducts(page));

  return (
    <div>
      <h1>Products</h1>

      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}

      <div>
        <div className='pagination'>
          <button disabled={page === 1} onClick={() => setPage((prevState) => prevState - 1)}>Prev</button>
          <button disabled={products.length < API_ITEMS_PER_PAGE_LIMIT} onClick={() => setPage((prevState) => prevState + 1)}>Next</button>
        </div>

        <ul className="products-list">
          {!!products.length && products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Products;
