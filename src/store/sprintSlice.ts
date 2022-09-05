import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  wordSet: [],
  isFromTutorial: false
};

const sprintSlice = createSlice({
  name: 'sprint',
  initialState: initialState,
  reducers: {
    setSprintWordSet: (state, actions) => {
      state.wordSet = actions.payload;
    },
    setIsFromTutorial: (state, actions) => {
      state.isFromTutorial = actions.payload;
    }
    // setIsModalSignupOpen: (state, actions) => {
    //   state.isModalSignupOpen = actions.payload;
    // },
    // setIsModalSigninOpen: (state, actions) => {
    //   state.isModalSigninOpen = actions.payload;
    // },
    // setIsLogined: (state, actions) => {
    //   state.isLogined = actions.payload;
    // }
    // handelLogout: (state) => {
    //   state.isLogined = false;
    //   state.currentUser = initialState.currentUser;
    //   localStorage.removeItem('currentUser');
    // },
  }
});

export const sprintReducer = sprintSlice.reducer;
export const { setSprintWordSet, setIsFromTutorial } = sprintSlice.actions;
