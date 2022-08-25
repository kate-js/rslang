import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

const testToolkitSlice = createSlice({
  name: 'testToolkit',
  initialState: initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    setCounter: (state, actions) => {
      state.value = actions.payload;
    }
  }
});

export const testToolkitReducer = testToolkitSlice.reducer;
export const { incremented, decremented, setCounter } = testToolkitSlice.actions;
