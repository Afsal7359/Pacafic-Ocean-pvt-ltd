import { configureStore } from '@reduxjs/toolkit';
import RevenuSlice from './RevenuSlice';

const store = configureStore({
  reducer: {
    auth: RevenuSlice,
  },
});

export default store;