import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the base URL for the API
const BASE_URL = "http://127.0.0.1:8000/api/images";

// Async thunk to fetch user favourites
export const getFavourites = createAsyncThunk(
  "favourites/getFavourites",
  async () => {
    console.log(sessionStorage.getItem("token"));
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      // Return the error response in case of failure
      return error.response;
    }
  }
);

// Async thunk to add an image to favourites
export const addToFavourites = createAsyncThunk(
  "favourites/addToFavourites",
  async (image, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}`,
        {
          src: image.src.medium,
          photographer: image.photographer,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // Return the rejected value with the error response
      return rejectWithValue(error.response);
    }
  }
);

// Async thunk to delete a favourite image
export const deleteFavourite = createAsyncThunk(
  "favourites/deleteFavourite",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      // Return the rejected value with the error response
      return rejectWithValue(error.response);
    }
  }
);

// Create a slice for managing favourites
const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  // Define extra reducers to handle async actions
  extraReducers: (builder) => {
    builder
      // Handle pending state for fetching favourites
      .addCase(getFavourites.pending, (state) => {
        state.status = "loading";
      })
      // Handle successful fetching of favourites
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favourites = action.payload;
      })
      // Handle failure to fetch favourites
      .addCase(getFavourites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle successful deletion of a favourite image
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        // Remove the deleted image from the favourites list
        state.favourites = state.favourites.filter(
          (favourite) => favourite.id !== action.payload.id
        );
      });
  },
});

export default favouriteSlice.reducer;
