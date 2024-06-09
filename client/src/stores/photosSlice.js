import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "5wziKO5lxC77NIV0H0lFE2EHUruMwOPsS1XPGFDKpkivWQRQ9xvIUbfW";

export const getPhotos = createAsyncThunk(
  "photos/getPhotos",
  async (page = 1) => {
    const response = await axios.get(
      `https://api.pexels.com/v1/curated?page=${page}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    return response.data.photos;
  }
);

const photoSlice = createSlice({
  name: "photo",
  initialState: {
    photos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.photos = action.payload;
      })
      .addCase(getPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllPhotos = (state) => state.photos.photos;
export default photoSlice.reducer;
