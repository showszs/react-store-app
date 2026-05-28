import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/ui/Loading';
import { fetchAllPosts, selectPosts, selectPostsError, selectPostsLoading } from '../redux/slices/postsSlice';
import type { AppDispatch } from '../redux/store';
import { useEffect } from 'react';

const Posts = () => {
  const dispatch = useDispatch<AppDispatch>();

  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchAllPosts('https://jsonplaceholder.typicode.com/posts'));
  }, [dispatch]);

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
