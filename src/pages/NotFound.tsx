import { Link } from 'react-router';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Unfortunately, the page you are looking for does not exist. It may have been removed or the address is incorrect.
        </p>
        <Link to="/" className={styles.button}>
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
