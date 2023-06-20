import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./slices";

const INITIAL_STATE = {
  data: [],
  isCategoriesLoading: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.isCategoriesLoading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.isCategoriesLoading = false;
      // state.data = action.payload;
      state.data = action.payload;
    },
    [getCategories.rejected]: (state, action) => {
      state.isCategoriesLoading = false;
    },
  },
});

export default categoriesSlice.reducer;
