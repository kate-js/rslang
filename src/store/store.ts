import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { testToolkitReducer } from './testToolkitSlice';
import { authReducer } from './authSlice';
import { sprintReducer } from './sprintSlice';
import { levelReducer } from './levelChoseSlice';

const rootReducer = combineReducers({
  testToolkit: testToolkitReducer,
  auth: authReducer,
  sprint: sprintReducer,
  level: levelReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type TState = ReturnType<typeof rootReducer>;
