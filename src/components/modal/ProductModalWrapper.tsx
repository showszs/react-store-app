import type { ReactNode } from "react"
import Modal from "../../modals/Modal"
import type { ProductInterface } from "../../types/Product.interface"
import ProductForm from "../forms/ProductForm"

interface ProductModalWrapperProps {
    title: string
    onSubmit: (product: ProductInterface) => void
    initialProduct: ProductInterface
    onClose: () => void
    error?: string | null
    children: ReactNode
    showModal: boolean
}

const ProductModalWrapper = ({ title, onSubmit, initialProduct, onClose, error, children, showModal }: ProductModalWrapperProps) => {
    return (
        <>
            {children}
            {showModal &&
                <Modal onClose={onClose} title={title}>
                    {error && <div>{error}</div>}
                    <ProductForm onSubmit={onSubmit} product={initialProduct} onClose={onClose} />
                </Modal>
            }
        </>
    )
}
export default ProductModalWrapper