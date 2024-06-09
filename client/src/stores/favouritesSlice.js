import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/images";

export const getFavourites = createAsyncThunk(
  "favourites/getFavourites",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

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
      return rejectWithValue(error.response);
    }
  }
);

export const deleteFavourite = createAsyncThunk(
  "favourites/deleteFavourite",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavourites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favourites = action.payload;
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.favourites = state.favourites.filter(
          (favourite) => favourite.id !== action.payload.id
        );
      });
  },
});

export default favouriteSlice.reducer;
