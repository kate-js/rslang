import { createSlice } from '@reduxjs/toolkit';

const currentUser = localStorage.getItem('currentUser');

const DEFAULT_USER = {
  message: '',
  token: '',
  refreshToken: '',
  userId: '',
  name: ''
};

export const initialState = {
  currentUser: currentUser ? JSON.parse(currentUser) : DEFAULT_USER,
  isModalSignupOpen: false,
  isModalSigninOpen: false,
  isLogined: false,
  isAuthLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, actions) => {
      state.currentUser = actions.payload;
    },
    setIsModalSignupOpen: (state, actions) => {
      state.isModalSignupOpen = actions.payload;
    },
    setIsModalSigninOpen: (state, actions) => {
      state.isModalSigninOpen = actions.payload;
    },
    setIsLogined: (state, actions) => {
      state.isLogined = actions.payload;
    },
    setIsAuthLoading: (state, actions) => {
      state.isAuthLoading = actions.payload;
    }
  }
});

export const authReducer = authSlice.reducer;
export const {
  setCurrentUser,
  setIsModalSignupOpen,
  setIsModalSigninOpen,
  setIsLogined,
  setIsAuthLoading
} = authSlice.actions;
