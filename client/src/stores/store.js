import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./imagesSlice";
import favouritesReducer from "./favouritesSlice";

const store = configureStore({
  reducer: {
    images: imagesReducer,
    favourites: favouritesReducer,
  },
});

export default store;
