import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';
import type { ProductInterface } from '../types/Product.interface';
import { generateMockProducts } from '../utils/mockapi';
import './Products.css';



const Products = () => {
  const { data: products, error, isLoading } = useFetch<ProductInterface>(generateMockProducts(1, 8));

  return (
    <div>
      <h1>Products</h1>
      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}
      <ul className="products-list">
        {!!products.length && products.map((product) => (
          <li key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-content">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <div className="product-price">${product.price.toFixed(2)}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Products;
