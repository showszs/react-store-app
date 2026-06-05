import { useSelector } from "react-redux"
import { selectProducts, selectTotalProductsCount } from "../../redux/slices/productsSlice"
import { API_ITEMS_PER_PAGE_LIMIT } from "../../utils/mockapi"
import styles from "./Pagination.module.css"
import { getPageNumbers } from "../../utils/getPageNumbers"

interface PaginationProps {
    page: number
    setPage: (page: number | ((prevState: number) => number)) => void
}

const Pagination = ({ page, setPage }: PaginationProps) => {
    const totalCount = useSelector(selectTotalProductsCount)
    const products = useSelector(selectProducts);
    const totalPages = Math.ceil(totalCount / API_ITEMS_PER_PAGE_LIMIT)
    const pageNumbers = getPageNumbers(totalPages, page)

    return (
        <div className={styles.pagination}>
            <div className={styles.controls}>
                <button
                    className={styles.btn}
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                >
                    &#60;Previous
                </button>

                <ul className={styles.pagesList}>
                    {pageNumbers.map((pageNum, index) =>
                        pageNum === "..." ? (
                            <li key={`dots-${index}`} className={styles.dots}>
                                …
                            </li>
                        ) : (
                            <li key={pageNum} className={styles.pageItem}>
                                <button
                                    className={`${styles.pageLink} ${pageNum === page ? styles.active : ""}`}
                                    onClick={() => setPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            </li>
                        )
                    )}
                </ul>

                <button
                    className={styles.btn}
                    disabled={products.length < API_ITEMS_PER_PAGE_LIMIT}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next&#62;
                </button>
            </div>
        </div>
    )
}
export default Pagination