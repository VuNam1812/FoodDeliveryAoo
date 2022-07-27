import {configureStore} from '@reduxjs/toolkit';
import tabReducer from './redux/tabSlice';
export const store = configureStore({
  reducer: {
    tabReducer,
  },
});
