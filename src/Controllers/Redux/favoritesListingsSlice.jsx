import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFavoritesListings } from '../Requests/dbRequests';

const initialState = {
  favoritesListings: [],
};

// Async thunk action for fetching listings
export const fetchFavoritesListings = createAsyncThunk(
  'listings/fetchFavoritesListings',
  async () => {
    const response = getFavoritesListings();

    return response;
  }
);

export const favoritesListingsSlice = createSlice({
  name: 'favoritesListings',
  initialState: initialState,
  reducers: {
    // Synchronous reducers go here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavoritesListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched listings to the array

        state.favoritesListings = [...action.payload]; // Adjust based on actual response structure
      })
      .addCase(fetchFavoritesListings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

//dispatchable synchronous actions here
//export const { addListing } = favoritesListingsSlice.actions;

//store
export default favoritesListingsSlice.reducer;
