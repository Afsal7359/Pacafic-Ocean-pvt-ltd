import { configureStore } from '@reduxjs/toolkit';
import RevenuSlice from './RevenuSlice';
import AuthSlice from './AuthSlice';
import Adminauth from './Adminauth';

const store = configureStore({
  reducer: {
    auth: RevenuSlice,
    user:AuthSlice,
    admin:Adminauth
  },
});

export default store;