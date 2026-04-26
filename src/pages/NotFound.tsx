import { Link } from 'react-router';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <div className="not-found__code">404</div>
        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__description">
          Unfortunately, the page you are looking for does not exist. It may have been removed or the address is incorrect.
        </p>
        <div className="not-found__decoration">
          <span className="decoration-item">🔍</span>
          <span className="decoration-item">📄</span>
          <span className="decoration-item">⚡</span>
        </div>
        <Link to="/" className="not-found__button">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
