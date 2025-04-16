import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const heroSlice = createSlice({
  name: "hero",

  initialState,
  reducers: {
    clickHeroProfile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { clickHeroProfile } = heroSlice.actions;
export default heroSlice.reducer;
