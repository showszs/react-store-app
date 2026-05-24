import { FaEdit, FaTrash } from 'react-icons/fa';
import type { ProductInterface } from '../../types/Product.interface';
import { useDelete } from '../../hooks/useDelete';
import { API_URL } from '../../utils/mockapi';
import EditProductButton from '../EditProductButton';

interface ProductProps {
    product: ProductInterface;
    reload: () => void;
}

const Product = ({ product: { name, image, category, description, price, id }, reload }: ProductProps) => {
    const { delete: deleteProduct } = useDelete(API_URL);

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(id);
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
                <EditProductButton product={{ id, name, image, category, description, price }} reload={reload}>
                    <FaEdit />
                </EditProductButton>
            </div>
        </li>
    )
};
export default Product