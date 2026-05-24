import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface AuthStateInterface {
  isLogged: boolean;
}

const initialState: AuthStateInterface = {
  isLogged: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLogged = (state: RootState) => state.auth.isLogged;

export default authSlice.reducer;
