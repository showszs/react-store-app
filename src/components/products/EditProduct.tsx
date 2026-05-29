import { type ReactNode } from "react"
import { useUpdate } from "../../hooks/useUpdate"
import { API_URL } from "../../utils/mockapi"
import type { ProductInterface } from "../../types/Product.interface"
import useModal from "../../hooks/useModal"
import useProductsForm from "../../hooks/useProductsForm"
import ProductModalWrapper from "../modal/ProductModalWrapper"
import styles from '../products/Product.module.css';

interface EditProductProps {
    product: ProductInterface
    reload: () => void
    children: ReactNode
}

const EditProduct = ({ product, reload, children }: EditProductProps) => {
    const { update } = useUpdate(API_URL)

    const { showModal, handleOpen, handleClose } = useModal()

    const { handleSubmit, error } = useProductsForm(update, () => {
        handleClose()
        reload()
    })

    return (
        <ProductModalWrapper
            title={`Edit Product #${product.id}`}
            onSubmit={handleSubmit}
            initialProduct={product}
            onClose={handleClose}
            error={error}
            showModal={showModal}>
            <button className={styles.edit} onClick={handleOpen}>{children}</button>
        </ProductModalWrapper >
    )
}

export default EditProduct