import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './reducer/counterSlice';
import profileSlice from './reducer/profileSlice';
import progressReducer from './reducer/progressSlice';
import kursusSlice from './reducer/kursusSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    profile: profileSlice,
    progress: progressReducer,
    kursus: kursusSlice,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
