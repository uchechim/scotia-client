import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListings } from '../Requests/dbRequests';

const initialState = {
  propertyListings: [],
};

// Async thunk action for fetching listings
export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async () => {
    const response = getListings();
    console.log(response);
    return response;
  }
);

export const listingsSlice = createSlice({
  name: 'propertyListings',
  initialState: initialState,
  reducers: {
    // Synchronous reducers go here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched listings to the array
        console.log(action.payload);
        state.propertyListings = [...action.payload]; // Adjust based on actual response structure
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

//dispatch
export const { addListing } = listingsSlice.actions;

//store
export default listingsSlice.reducer;
