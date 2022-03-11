import { configureStore } from '@reduxjs/toolkit';
import googleSearchReducer from '../features/googleSearch/googleSearchSlice';

export const store = configureStore({
  reducer: {
    googleSearch: googleSearchReducer,
  },
});
