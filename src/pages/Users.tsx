import { useEffect } from 'react';
import Loading from '../components/ui/Loading';
import { fetchAllUsers, selectUsers, selectUserError, selectUserLoading } from '../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import styles from './Users.module.css';

const Users = () => {

  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  useEffect(() => {
    dispatch(fetchAllUsers('https://jsonplaceholder.typicode.com/users'));
  }, [dispatch]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      <h1>Users</h1>
      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}
      <div className={styles.container}>
        {!!users.length && users.map((user) => (
          <div key={user.id} className={styles.card}>
            <div className={styles.avatar}>{getInitials(user.name)}</div>
            <div className={styles.header}>
              <h3 className={styles.name}>{user.name}</h3>
              <p className={styles.email}>{user.email}</p>
            </div>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <span className={styles.infoValue}>{user.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Company</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Website</span>
                <span className={styles.infoValue}>{user.website}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Users;
