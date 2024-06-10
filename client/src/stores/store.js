import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./imagesSlice";
import favouritesReducer from "./favouritesSlice";

// Configure Redux store
const store = configureStore({
  reducer: {
    images: imagesReducer, // Reducer for managing images
    favourites: favouritesReducer, // Reducer for managing favourites
  },
});

export default store;
