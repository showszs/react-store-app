import { FaEdit, FaTrash } from 'react-icons/fa';
import type { ProductInterface } from '../../types/Product.interface';
import axios from 'axios';
import { API_URL } from '../../utils/mockapi';

interface ProductProps {
    product: ProductInterface;
    reload: () => void;
}

const Product = ({ product: { name, image, category, description, price, id }, reload }: ProductProps) => {

    const handleDeleteProduct = async () => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            console.log('Product deleted:', response.data);
            reload();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

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
                <button className="product-item__delete" onClick={handleDeleteProduct}>
                    <FaTrash />
                </button>
                <button className="product-item__edit">
                    <FaEdit />
                </button>
            </div>
        </li>
    )
};
export default Product