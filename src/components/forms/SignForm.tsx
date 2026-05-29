import { useEffect, useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import { object, ref, string } from 'yup';
import axios from 'axios';
import styles from './SignForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import { login, selectIsLogged } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router';

interface SignFormValues {
    login: string;
    email?: string;
    password: string;
    confirmPassword?: string;
}

const loginValidationSchema = object({
    login: string()
        .required('Login is required')
        .min(3, 'Login must be at least 3 characters')
        .max(15, 'Login must be at most 15 characters'),
    password: string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be at most 20 characters'),
});

const signUpValidationSchema = object({
    login: string()
        .required('Login is required')
        .min(3, 'Login must be at least 3 characters')
        .max(15, 'Login must be at most 15 characters'),
    email: string()
        .required('Email is required')
        .email('Invalid email address'),
    password: string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be at most 20 characters'),
    confirmPassword: string()
        .required('Confirm password is required')
        .oneOf([ref('password')], 'Passwords must match')
});

type Mode = 'login' | 'signup';

const SignForm = () => {
    const [mode, setMode] = useState<Mode>('login');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();


    const isLogged = useSelector(selectIsLogged);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) navigate('/products');
    }, [isLogged, navigate]);

    const handleSubmit = async (
        values: SignFormValues,
        { resetForm }: FormikHelpers<SignFormValues>
    ) => {
        setError(null);
        setSuccess(false);

        try {
            const payload = mode === 'login'
                ? { login: values.login, password: values.password }
                : { login: values.login, email: values.email, password: values.password };

            await axios.post("https://67a9037f6e9548e44fc2acf8.mockapi.io/products", payload);

            dispatch(login());
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            resetForm();
        } catch (error) {
            setSuccess(false);
            setError('Error submitting form');
            console.error('Error submitting form:', error);
        }
    };

    const toggleMode = (newMode: Mode) => {
        setMode(newMode);
        setError(null);
        setSuccess(false);
    };

    const isLoginMode = mode === 'login';
    const validationSchema = isLoginMode ? loginValidationSchema : signUpValidationSchema;
    const initialValues: SignFormValues = isLoginMode
        ? { login: '', password: '' }
        : { login: '', email: '', password: '', confirmPassword: '' };

    return (
        <div className={styles.form}>
            <h1 className={styles.title}>{isLoginMode ? 'Sign In' : 'Sign Up'}</h1>

            <Formik
                key={mode}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form className={styles.formContent}>
                        <div className={styles.group}>
                            <label htmlFor="login" className={styles.label}>Login</label>
                            <Field
                                id="login"
                                name="login"
                                type="text"
                                className={styles.input}
                                placeholder="Enter your login"
                            />
                            <ErrorMessage name="login" component="div" className={styles.error} />
                        </div>

                        {!isLoginMode && (
                            <div className={styles.group}>
                                <label htmlFor="email" className={styles.label}>Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={styles.input}
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </div>
                        )}

                        <div className={styles.group}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <Field
                                id="password"
                                name="password"
                                type="password"
                                className={styles.input}
                                placeholder="Enter your password"
                            />
                            <ErrorMessage name="password" component="div" className={styles.error} />
                        </div>

                        {!isLoginMode && (
                            <div className={styles.group}>
                                <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                                <Field
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className={styles.input}
                                    placeholder="Confirm your password"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
                            </div>
                        )}

                        {success && <div className={`${styles.message} ${styles.messageSuccess}`}>
                            {isLoginMode ? 'Successfully signed in' : 'Account created successfully'}
                        </div>}
                        {error && <div className={`${styles.message} ${styles.messageError}`}>{error}</div>}

                        <button
                            type="submit"
                            className={styles.button}
                            disabled={isSubmitting || !(isValid && dirty)}
                        >
                            {isSubmitting ? 'Submitting...' : (isLoginMode ? 'Sign In' : 'Sign Up')}
                        </button>

                        <div className={styles.footer}>
                            {isLoginMode ? (
                                <p>Don't have an account? <button type="button" className={styles.link} onClick={() => toggleMode('signup')}>Sign Up</button></p>
                            ) : (
                                <p>Already have an account? <button type="button" className={styles.link} onClick={() => toggleMode('login')}>Login</button></p>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignForm;