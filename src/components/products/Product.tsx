import { FaEdit, FaTrash } from 'react-icons/fa';
import type { ProductInterface } from '../../types/Product.interface';

interface ProductProps {
    product: ProductInterface;
}

const Product = ({ product: { name, image, category, description, price } }: ProductProps) => {
    return (
        <li className="product-card">
            <div className="product-image">
                <img src={image} alt={name} />
            </div>
            <div className="product-content">
                <h3 className="product-title">{name}</h3>
                <p className="product-category">{category}</p>
                <p className="product-description">{description}</p>
                <div className="product-footer">
                    <div className="product-price">${price.toFixed(2)}</div>
                </div>
            </div>
            <div className="product-actions">
                <button className="product-item__delete">
                    <FaTrash />
                </button>
                <button className="product-item__edit">
                    <FaEdit />
                </button>
            </div>
        </li>
    )
}
export default Product