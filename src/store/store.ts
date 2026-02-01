import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    notifications: notificationsReducer,

  },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: false,
    //   immutableCheck: false,
    // }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
