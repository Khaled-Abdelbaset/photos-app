import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "5wziKO5lxC77NIV0H0lFE2EHUruMwOPsS1XPGFDKpkivWQRQ9xvIUbfW";

export const getImages = createAsyncThunk(
  "images/getImages",
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

const imageSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default imageSlice.reducer;
