import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  currentUser: {
    message: '',
    token: '',
    refreshToken: '',
    userId: '',
    name: ''
  },
  isModalSignupOpen: false,
  isModalSigninOpen: false,
  isLogined: false
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
    }
  }
});

export const authReducer = authSlice.reducer;
export const { setCurrentUser, setIsModalSignupOpen, setIsModalSigninOpen, setIsLogined } =
  authSlice.actions;
