import Loading from '../components/ui/Loading';
import { useFetch } from '../hooks/useFetch';
import type { UserInterface } from '../types/User.interface';

const Users = () => {
  const { data: users, error, isLoading } = useFetch<UserInterface>('https://jsonplaceholder.typicode.com/users', 5);

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
