import { useEffect } from 'react';
import Loading from '../components/ui/Loading';
import { fetchAllUsers, selectUsers, selectUserError, selectUserLoading } from '../redux/slices/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';

const Users = () => {

  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  useEffect(() => {
    dispatch(fetchAllUsers('https://jsonplaceholder.typicode.com/users'));
  }, [dispatch]);

  return (
    <div>
      <h1>Users</h1>
      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}
      <ul>
        {!!users.length && users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
