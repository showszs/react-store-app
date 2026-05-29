import { FaEdit, FaTrash } from 'react-icons/fa';
import type { ProductInterface } from '../../types/Product.interface';
import { useDelete } from '../../hooks/useDelete';
import { API_URL } from '../../utils/mockapi';
import EditProduct from './EditProduct';
import { useSelector } from 'react-redux';
import { selectIsLogged } from '../../redux/slices/authSlice';
import styles from './Product.module.css';

interface ProductProps {
    product: ProductInterface;
    reload: () => void;
}

const Product = ({ product: { name, image, category, description, price, id }, reload }: ProductProps) => {
    const isLogged = useSelector(selectIsLogged)
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
        <li className={styles.card}>
            <div className={styles.image}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{name}</h3>
                <p className={styles.category}>{category}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.footer}>
                    <div className={styles.price}>${price.toFixed(2)}</div>
                </div>
            </div>
            {isLogged && (
                <div className={styles.actions}>
                    <button className={styles.delete} onClick={handleDeleteProduct}>
                        <FaTrash />
                    </button>
                    <EditProduct product={{ id, name, image, category, description, price }} reload={reload}>
                        <FaEdit />
                    </EditProduct>
                </div>
            )}
        </li>
    )
};
export default Product