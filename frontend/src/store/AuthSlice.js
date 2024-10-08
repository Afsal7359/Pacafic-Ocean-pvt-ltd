import { createSlice } from '@reduxjs/toolkit';

// Get the initial token value from localStorage
const storedToken = localStorage.getItem('usertoken');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!storedToken,
    token: storedToken,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('usertoken', action.payload); // Use action.payload instead of state.token
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('usertoken');
    },
  },  
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
