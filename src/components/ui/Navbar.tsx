import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import { logout, selectIsLogged } from '../../redux/slices/authSlice';
import type { AppDispatch } from '../../redux/store';
import styles from './Navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLogged = useSelector(selectIsLogged);


  const handleLogout = () => {
    dispatch(logout());
  };


  return (
    <nav className={styles.navbar}>
      <div className="container">
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink to="/">Products</NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/posts">Posts</NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/users">Users</NavLink>
          </li>
          <li className={`${styles.item} ${styles.itemRight}`}>
            {isLogged
              ? <NavLink to="/products" onClick={handleLogout}>Log Out</NavLink>
              : <NavLink to="/login">Log In</NavLink>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
