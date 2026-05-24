import type { ReactNode } from "react"
import { createPortal } from "react-dom"

const modalRoot = document.getElementById('modal-root')

interface ModalProps {
    children: ReactNode
    onClose: () => void
    title?: string
}

const Modal = ({ children, onClose, title = 'Modal Title' }: ModalProps) => {
    if (!modalRoot) return null

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    )
}
export default Modal