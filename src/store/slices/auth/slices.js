import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerValidationSchema } from "./validation";

import api from "../../utils/api.instance";
import Toast from "react-hot-toast";

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      // @do authentication with payload : { username, password }
      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem("token", data?.token);

      if (!data) {
        return rejectWithValue({
          message: "invalid username or password",
        });
      }
      return data?.isAccountExist;
    } catch (error) {
      // return rejectWithValue("Incorrect username or password");

      // menjadi action.payload yang ada di error handler reducer index.js
      return rejectWithValue(error.response ? error?.response?.data : error);
    }
  }
);

export const keepLogin = createAsyncThunk(
  "auth/keepLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/auth");

      return data;
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      // return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      return {};
    } catch (error) {
      // console.error(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth", payload);

      // save token
      localStorage.setItem("token", data?.token);

      return data?.data;
    } catch (error) {
      // console.error(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload, { rejectWithValue }) => {
    try {
      await api.put("/auth/forgotPass", payload);
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      await api.patch("/auth/resetPass", payload);
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const changeUsername = createAsyncThunk(
  "auth/changeUsername",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/changeUsername", payload);
      // Toast.success(data.message);
      return data.message;
    } catch (error) {
      Toast.error(error.response ? error.response.data : error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const changePhoneNumber = createAsyncThunk(
  "auth/changePhoneNumber",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/changePhone", payload);
      // Toast.success(data.message);
      return;
    } catch (error) {
      Toast.error(error.response ? error.response.data : error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (payload, { rejectWithValue }) => {
    try {
      await api.patch("/auth/verify");

      return;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const updateImageProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/profile/single-uploaded", payload);
      Toast.success("Image profile updated!");
      return data?.imgProfile;
    } catch (error) {
      Toast.success("update image profile failed!");

      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);
