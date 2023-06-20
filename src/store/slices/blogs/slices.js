import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";

export const getArticles = createAsyncThunk(
  "blogs/getArticles",
  async (payload, { rejectWithValue }) => {
    try {
      const { id_cat, page, sort } = payload;
      const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`;

      const { data } = await api.get("/blog?" + encodeURI(PARAMETER));
      // const { data } = await api.get("/blog?id_cat=3&sort=ASC&page=2");

      return data;
    } catch (error) {
      // console.error(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const getLikedArticles = createAsyncThunk(
  "blogs/getLikedArticles",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/blog/pagLike");
      return data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const likeArticle = createAsyncThunk(
  "blogs/getLikeArticle",
  async (payload, { rejectWithValue }) => {
    try {
      await api.post("/blog/like", payload);
      return;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);
