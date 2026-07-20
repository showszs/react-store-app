import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router'; // если используете v6, иногда импорт идет из 'react-router-dom'
import { logout, selectIsLogged } from '../../redux/slices/authSlice';
import type { AppDispatch } from '../../redux/store';
import styles from './Navbar.module.css';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isLogged = useSelector(selectIsLogged);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      console.log(response.data.message);

      dispatch(logout());
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>

        <button
          className={`${styles.burger} ${isOpen ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          <span className={styles.line}></span>
          <span className={styles.line}></span>
          <span className={styles.line}></span>
        </button>

        <ul className={`${styles.list} ${isOpen ? styles.open : ''}`}>
          <li className={styles.item}>
            <NavLink to="/" onClick={closeMenu}>Products</NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/posts" onClick={closeMenu}>Posts</NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/users" onClick={closeMenu}>Users</NavLink>
          </li>
          <li className={`${styles.item} ${styles.itemRight}`}>
            {isLogged
              ? <NavLink to="/" onClick={handleLogout}>Log Out</NavLink>
              : <NavLink to="/login" onClick={closeMenu}>Log In</NavLink>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;