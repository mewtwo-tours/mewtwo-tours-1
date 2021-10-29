import { createSlice } from "@reduxjs/toolkit";
import { SliderComponent } from "react-native";

export const getListingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: []
  },
  reducers: {
    getListings: (state, action) => {
      state.listings = action.payload;
    }
  }
})

export const selectListings = state => state.listings.listings;

export const { getListings } = getListingsSlice.actions;

export default getListingsSlice.reducer;
