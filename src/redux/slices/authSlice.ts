import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';
import { apiUrl } from '../../api';

export interface AuthStateInterface {
  isLogged: boolean;
  isCheckingAuth: boolean;
}

const initialState: AuthStateInterface = {
  isLogged: false,
  isCheckingAuth: false,
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    await axios.get(`${apiUrl}/me`, { withCredentials: true });
  } catch (err) {
    return rejectWithValue(`Not authenticated: ${err}`);
  }
});

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
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isLogged = true;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLogged = false;
        state.isCheckingAuth = false;
      });
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLogged = (state: RootState) => state.auth.isLogged;

export default authSlice.reducer;
