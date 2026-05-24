import { useState, type ReactNode } from "react"
import Modal from "../modals/Modal"
import ProductForm from "./ProductForm"
import type { ProductInterface } from "../types/Product.interface"
import { API_URL } from "../utils/mockapi"
import { useUpdate } from "../hooks/useUpdate"

interface EditProductButtonProps {
    product: ProductInterface
    reload: () => void
    children: ReactNode
}

const EditProductButton = ({ product, reload, children }: EditProductButtonProps) => {
    const [showModal, setShowModal] = useState(false)
    const { update, error } = useUpdate(API_URL)

    const handleOpenModal = () => setShowModal(true)

    const handleCloseModal = () => setShowModal(false)

    const handleSubmit = async (product: ProductInterface) => {
        try {
            const updatedProduct = await update(product)
            console.log(updatedProduct)
            handleCloseModal()
            reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <button className="product-item__edit" onClick={handleOpenModal}>{children}</button>
            {showModal &&
                <Modal onClose={handleCloseModal} title={`Edit Product #${product.id}`}>
                    {error && <div>{error}</div>}
                    <ProductForm onSubmit={handleSubmit} product={product} />
                </Modal>
            }
        </>
    )
}
export default EditProductButton