import type { RootState } from '../store';
import createFetchSlice from './createFetchSlice';
import type { UserInterface } from '../../types/User.interface';

const initialState = {
  data: [] as UserInterface[],
  totalCount: 0,
  error: null,
  isLoading: false,
};

const usersSlice = createFetchSlice<UserInterface>('users', initialState);

export const fetchAllUsers = usersSlice.fetchThunk;
export const selectUsers = (state: RootState) => state.users.data;
export const selectUserLoading = (state: RootState) => state.users.isLoading;
export const selectUserError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
