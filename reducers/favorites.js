import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",

  initialState,
  reducers: {
    addFavorites: (state, action) => {
      state.value.push(action.payload);
    },
    removeFavorites: (state, action) => {
      state.value = state.value.filter(
        (favorite) => favorite.id !== action.payload.id
      );
    },
    removeAllFavorites: (state) => {
      state.value = [];
    },
  },
});

export const { addFavorites, removeFavorites, removeAllFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
