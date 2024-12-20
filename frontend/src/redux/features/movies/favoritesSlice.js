import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: JSON.parse(localStorage.getItem("favorites")) || [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.find((movie) => movie._id === action.payload._id)) {
        const newState = [...state, action.payload];
        localStorage.setItem("favorites", JSON.stringify(newState));
        return newState;
      }
    },
    removeFavorite: (state, action) => {
      const newState = state.filter(
        (movie) => movie._id !== action.payload._id
      );
      localStorage.setItem("favorites", JSON.stringify(newState));
      return newState;
    },
    toggleFavorite: (state, action) => {
      const movieExists = state.find(
        (movie) => movie._id === action.payload._id
      );
      if (movieExists) {
        const newState = state.filter(
          (movie) => movie._id !== action.payload._id
        );
        localStorage.setItem("favorites", JSON.stringify(newState));
        return newState;
      } else {
        const newState = [...state, action.payload];
        localStorage.setItem("favorites", JSON.stringify(newState));
        return newState;
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
