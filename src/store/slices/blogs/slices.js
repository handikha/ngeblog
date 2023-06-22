import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const getArticles = createAsyncThunk(
  "blogs/getArticles",
  async (payload, { rejectWithValue }) => {
    try {
      const { id_cat, page, sort } = payload;
      const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`;

      const id = localStorage.getItem("id");

      const { data } = await api.get("/blog?" + encodeURI(PARAMETER));

      let response = [];

      for (let i = 1; i <= data.page; i++) {
        let response2 = await api.get(`/blog?page=${i}`);
        let output = response2.data.result;
        response = response.concat(output);
      }

      let myArticles = response.filter((article) => {
        return article.UserId == id;
      });

      return { data, response, myArticles };
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

export const createNewArticle = createAsyncThunk(
  "blogs/postBlog",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/blog", payload);
      Toast.success("Success post an Article");
      return data;
    } catch (error) {
      console.error(error);
      Toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "blogs/deleteBlog",
  async (payload, { rejectWithValue }) => {
    try {
      await api.patch("/blog/remove/" + encodeURI(payload));
      Toast.success("Article deleted!");
    } catch (error) {
      console.error(error);
      Toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
