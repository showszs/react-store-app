import type { RootState } from '../store';
import createFetchSlice from './createFetchSlice';
import type { PostInterface } from '../../types/Post.interface';

const initialState = {
  data: [] as PostInterface[],
  totalCount: 0,
  error: null,
  isLoading: false,
};

const postsSlice = createFetchSlice<PostInterface>('posts', initialState);

export const fetchAllPosts = postsSlice.fetchThunk;
export const selectPosts = (state: RootState) => state.posts.data;
export const selectPostsLoading = (state: RootState) => state.posts.isLoading;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
