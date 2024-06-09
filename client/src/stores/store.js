import { configureStore } from "@reduxjs/toolkit";
import photosReducer from "./photosSlice";

const store = configureStore({
  reducer: {
    photos: photosReducer,
  },
});

export default store;
