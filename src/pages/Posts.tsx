import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/ui/Loading';
import { fetchAllPosts, selectPosts, selectPostsError, selectPostsLoading } from '../redux/slices/postsSlice';
import type { AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import styles from './Posts.module.css';

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
      <div className={styles.container}>
        {!!posts.length && posts.map((post) => (
          <div key={post.id} className={styles.item}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Posts;
