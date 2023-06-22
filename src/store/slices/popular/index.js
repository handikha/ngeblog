import { createSlice } from "@reduxjs/toolkit";
import { getPopularBlogs } from "./slices";

const INITIAL_STATE = {
  data: [],
  isPopularLoading: false,
};

const popularBlogsSlice = createSlice({
  name: "popularBlogs",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularBlogs.pending, (state, action) => {
        state.isPopularLoading = true;
      })
      .addCase(getPopularBlogs.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getPopularBlogs.rejected, (state, action) => {
        state.isPopularLoading = false;
      });
  },
});

export default popularBlogsSlice.reducer;
