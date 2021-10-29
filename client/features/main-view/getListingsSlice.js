import { createSlice } from "@reduxjs/toolkit";
import { SliderComponent } from "react-native";


export const getListingsSlice = createSlice({
  //name doesnt matter
  name: 'listings',

  initialState: {
    currentListings: [],
    loading: true
  },

  reducers: {
    //this is the name of the action
    getListings: (state, action) => {
      state.currentListings = action.payload;
    },
    upvote: (state, action) => {
      //get the current listing
      state.currentListings[action.payload].upvotes += 1;
    },
    downvote: (state, action) => {
      //get the current listing
      state.currentListings[action.payload].downvotes += 1;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
})

export const selectListings = state => state.listings.currentListings;

export const { getListings, upvote, downvote, setLoading } = getListingsSlice.actions;

export default getListingsSlice.reducer;
