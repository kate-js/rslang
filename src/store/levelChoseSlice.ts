import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  numberPage: 0,
  level: 'A1',
  isFromTutorial: true
};

const levelChose = createSlice({
  name: 'level',
  initialState: initialState,
  reducers: {
    setPage: (state, actions) => {
      state.numberPage = actions.payload;
    },
    setLevel: (state, actions) => {
      state.level = actions.payload;
    },
    setIsFromTutorial: (state, actions) => {
      state.isFromTutorial = actions.payload;
    }
  }
});

export const levelReducer = levelChose.reducer;
export const { setPage, setLevel, setIsFromTutorial } = levelChose.actions;
