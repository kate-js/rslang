import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { testToolkitReducer } from './testToolkitSlice';
import { authReducer } from './authSlice';

const rootReducer = combineReducers({
  testToolkit: testToolkitReducer,
  auth: authReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type TState = ReturnType<typeof rootReducer>;

// export type TState = {
//   testToolkit: { value: number };
//   auth: {
//     currentUser: {
//       message: string;
//       token: string;
//       refreshToken: string;
//       userId: string;
//       name: string;
//     };
//     isModalSignupOpen: boolean;
//     isModalSigninOpen: boolean;
//   };
// };
