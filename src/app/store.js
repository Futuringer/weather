import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../api/weatherApiSlice';
import authReducer from '../api/authApiSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    auth: authReducer,
  },
});
