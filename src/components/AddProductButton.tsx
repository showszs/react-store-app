import { useState } from "react"
import Modal from "../modals/Modal"
import ProductForm from "./ProductForm"
import type { ProductInterface } from "../types/Product.interface"
import { useAdd } from "../hooks/useAdd"
import { API_URL } from "../utils/mockapi"
import { INITIAL_PRODUCT } from "../data/mockData"

const AddProductButton = () => {
    const { add, error } = useAdd(API_URL)
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
            <button onClick={handleOpenModal}>Add Product Button</button>
            {showModal &&
                <Modal onClose={handleCloseModal} title="Add New Product">
                    {error && <div>{error}</div>}
                    <ProductForm onSubmit={handleSubmit} product={INITIAL_PRODUCT} />
                </Modal>
            }
        </>
    )
}
export default AddProductButton