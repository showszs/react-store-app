import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';
import type { TodoInterface } from '../types/Todo.interface';

const Todos = () => {
  const { data: todos, error, isLoading } = useFetch<TodoInterface>('https://jsonplaceholder.typicode.com/todos');

  return (
    <div>
      <h1>Todos</h1>
      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}
      <ul>
        {!!todos.length && todos.map((todo) => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            {' '}
            [{todo.completed ? '✓' : '○'}]
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Todos;
