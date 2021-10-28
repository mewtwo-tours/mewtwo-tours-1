import { createSlice } from "@reduxjs/toolkit";

export const exampleSlice = createSlice({
  // name: 'text',
  // initialState: {
  //   text: ''
  // },
  // reducers: {
  //   changeText: (state, action) => {
  //     state.text = action.payload;
  //   }
  // }
})

export const selectText = state => state.text;

export const {changeText} = promptSlice.actions;

export default promptSlice.reducer;