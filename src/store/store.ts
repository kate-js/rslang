import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { testToolkitReducer } from './testToolkitSlice';
import { authReducer } from './authSlice';
import { pageReducer } from '../pages/GroupLevel/GroupPage';

const rootReducer = combineReducers({
  testToolkit: testToolkitReducer,
  auth: authReducer,
  page: pageReducer,
});

export const store = configureStore({
  reducer: rootReducer
});

export type TState = ReturnType<typeof rootReducer>;
