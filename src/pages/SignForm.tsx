import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import './SignForm.css';

interface SignFormValues {
    login: '';
    password: '';
}

const validationSchema = object({
    login: string()
        .required('Login is required')
        .min(3, 'Login must be at least 3 characters')
        .max(15, 'Login must be at most 15 characters'),
    password: string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be at most 20 characters'),
});

const SignForm = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (
        values: SignFormValues,
        { setSubmitting, resetForm }: FormikHelpers<SignFormValues>
    ) => {

        setError(null);
        setSuccess(false);

        try {
            await axios.post("https://67a9037f6e9548e44fc2acf8.mockapi.io/products", values);
            setSuccess(true);
            resetForm();
        } catch (error) {
            setSuccess(false);
            setError('Error submitting form');
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="sign-form">
            <h1 className="sign-form__title">Sign In</h1>
            <Formik
                initialValues={{ login: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="sign-form__form">
                        <div className="sign-form__group">
                            <label htmlFor="login" className="sign-form__label">Login</label>
                            <Field
                                id="login"
                                name="login"
                                type="text"
                                className="sign-form__input"
                                placeholder="Enter your login"
                            />
                            <ErrorMessage name="login" component="div" className="sign-form__error" />
                        </div>
                        <div className="sign-form__group">
                            <label htmlFor="password" className="sign-form__label">Password</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                className="sign-form__input"
                                placeholder="Enter your password"
                            />
                            <ErrorMessage name="password" component="div" className="sign-form__error" />
                        </div>

                        {success && <div className="sign-form__message sign-form__message--success">Successfully signed in</div>}
                        {error && <div className="sign-form__message sign-form__message--error">{error}</div>}

                        <button
                            type="submit"
                            className="sign-form__button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Sign In'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignForm;