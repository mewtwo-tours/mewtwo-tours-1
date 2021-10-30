import { configureStore } from '@reduxjs/toolkit'
import getListingsSlice from '../features/main-view/getListingsSlice'

const store = configureStore({
  reducer: {
    listings: getListingsSlice
  }
})

export default store;