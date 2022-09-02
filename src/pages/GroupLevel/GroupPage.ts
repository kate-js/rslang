import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  numberPage: 1,
  level: 'A1'
};

const pageTutorial = createSlice({
  name: 'page',
  initialState: initialState,
  reducers: {
    setPage: (state, actions) => {
      state.numberPage = actions.payload;
    },
    setLevel: (state, actions) => {
      state.level = actions.payload;
    }
  }
});

export const pageReducer = pageTutorial.reducer;
export const { setPage, setLevel } = pageTutorial.actions;
