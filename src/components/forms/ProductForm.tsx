import { ErrorMessage, Field, Form, Formik } from "formik"
import { number, object, string } from "yup";
import type { ProductInterface } from "../../types/Product.interface";
import { PRODUCT_CATEGORIES } from "../../data/mockData";
import styles from './ProductForm.module.css';


interface ProductFormProps {
    onSubmit: (product: ProductInterface) => void
    product: ProductInterface
    onClose: () => void
}

const validationSchema = object({
    name: string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must be at most 100 characters'),
    description: string()
        .required('Description is required')
        .min(6, 'Description must be at least 6 characters')
        .max(200, 'Description must be at most 200 characters'),
    price: number()
        .required('Price is required')
        .positive('Price must be positive')
        .min(1, 'Minimum price is 1')
        .max(10000, 'Maximum price is 10000'),
    category: string()
        .required('Category is required')
        .oneOf(
            PRODUCT_CATEGORIES,
            'Invalid category'
        )
});


const ProductForm = ({ onSubmit, product, onClose }: ProductFormProps) => {
    const initialFormValues: ProductInterface = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
    };

    const handleSubmit = (values: ProductInterface) => {
        onSubmit({
            ...values
        })
        onClose()
    }

    return (
        <div className={styles.form}>
            <Formik
                initialValues={initialFormValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid }) => (
                    <Form className={styles.formContent}>
                        <div className={styles.group}>
                            <label htmlFor="name" className={styles.label}>Name</label>
                            <Field type="text" name="name" id="name" className={styles.input} />
                            <ErrorMessage name="name" component="div" className={styles.error} />
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="description" className={styles.label}>Description</label>
                            <Field as="textarea" name="description" id="description" className={styles.input} />
                            <ErrorMessage name="description" component="div" className={styles.error} />
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="price" className={styles.label}>Price</label>
                            <Field type="number" name="price" id="price" className={styles.input} />
                            <ErrorMessage name="price" component="div" className={styles.error} />
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="category" className={styles.label}>Category</label>
                            <Field as="select" name="category" id="category" className={styles.select}>
                                <option value="">Select a category</option>
                                {PRODUCT_CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className={styles.error} />
                        </div>
                        <button type="submit" className={styles.submit} disabled={isSubmitting || !isValid} >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default ProductForm