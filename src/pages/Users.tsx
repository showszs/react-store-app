import { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import Loading from '../components/ui/Loading';
import { fetchAllUsers, selectUsers, selectUserError, selectUserLoading } from '../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import styles from './Users.module.css';
import axios from 'axios';
import { apiUrl } from '../api';

const Users = () => {

  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  useEffect(() => {
    dispatch(fetchAllUsers(`${apiUrl}/profiles`));
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/profiles/${id}`);
      dispatch(fetchAllUsers(`${apiUrl}/profiles`));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}
      <div className={styles.container}>
        {!!users.length && users.map((user) => (
          <div key={user._id} className={styles.card}>
            <div className={styles.avatar}></div>
            <div className={styles.header}>
              <h3 className={styles.login}>{user.login}</h3>
              <p className={styles.email}>{user.email}</p>
            </div>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Company</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Website</span>
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.delete} onClick={() => handleDelete(user._id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {!users.length && <h2>No users found</h2>}
      </div>
    </div>
  );
};
export default Users;
