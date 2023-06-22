import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";

export const getPopularBlogs = createAsyncThunk(
  "popular/getPopularBlogs",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        "https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav?sort=ASC"
      );
      return data.result.sort((a, b) => b.total_fav - a.total_fav);
    } catch (error) {
      console.log(error);
    }
  }
);
