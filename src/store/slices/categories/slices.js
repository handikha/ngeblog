import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.instance";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/blog/allCategory");

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
