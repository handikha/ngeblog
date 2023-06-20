import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";

export const getPopularBlogs = createAsyncThunk(
  "popular/getPopularBlogs",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/blog/pagFav");
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
