import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from '../features/goals/goalsSlice';
import photosReducer from '../features/photos/photosSlice';

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    photos: photosReducer
  },
});
