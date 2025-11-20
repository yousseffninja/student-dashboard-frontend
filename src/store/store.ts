import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import languageReducer from './slices/languageSlice';
import quizReducer from './slices/quizSlice';
import announcementReducer from './slices/announcementSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    quizzes: quizReducer,
    announcements: announcementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;