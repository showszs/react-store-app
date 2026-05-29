import { useState } from "react"
import Modal from "../modals/Modal"
import ProductForm from "./forms/ProductForm"
import type { ProductInterface } from "../types/Product.interface"
import { useAdd } from "../hooks/useAdd"
import { API_URL } from "../utils/mockapi"
import { INITIAL_PRODUCT } from "../data/mockData"

interface AddProductButtonProps {
    className?: string
}

const AddProductButton = ({ className = "" }: AddProductButtonProps) => {
    const { add } = useAdd(API_URL)
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleSubmit = async (product: ProductInterface) => {
        try {
            const newProduct = await add(product)
            console.log(newProduct)
            handleCloseModal()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <button className={className || "add-product-btn"} onClick={handleOpenModal}>+ Add Product</button>
            {showModal &&
                <Modal onClose={handleCloseModal} title="Add New Product">
                    <ProductForm onSubmit={handleSubmit} product={INITIAL_PRODUCT} onClose={handleCloseModal} />
                </Modal>
            }
        </>
    )
}
export default AddProductButton