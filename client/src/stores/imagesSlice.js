import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API key for Pexels API
const API_KEY = "5wziKO5lxC77NIV0H0lFE2EHUruMwOPsS1XPGFDKpkivWQRQ9xvIUbfW";

// Async thunk to fetch images from Pexels API
export const getImages = createAsyncThunk(
  "images/getImages",
  async (page = 1, { rejectWithValue }) => {
    try {
      // Fetch curated images from Pexels API
      const response = await axios.get(
        `https://api.pexels.com/v1/curated?page=${page}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );
      return response.data.photos;
    } catch (error) {
      // Throw error if fetching images fails
      return rejectWithValue(error.response);
    }
  }
);

// Create a slice for managing images
const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  // Define extra reducers to handle async actions
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetching images
      .addCase(getImages.pending, (state) => {
        state.status = "loading";
      })
      // Handle successful fetching of images
      .addCase(getImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      // Handle failure to fetch images
      .addCase(getImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;
