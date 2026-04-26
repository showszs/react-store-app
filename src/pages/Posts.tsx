import Loading from '../components/ui/Loading';
import { useFetch } from '../hooks/useFetch';
import type { PostInterface } from '../types/Post.interface';

const Posts = () => {
  const { data: posts, error, isLoading } = useFetch<PostInterface>('https://jsonplaceholder.typicode.com/posts', 4);

  return (
    <div>
      <h1>Posts</h1>
      {isLoading && <Loading />}
      {error && <p className='error'>{error}</p>}
      <ul>
        {!!posts.length && posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Posts;
