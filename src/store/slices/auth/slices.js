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
      localStorage.setItem("id", data?.isAccountExist?.id);

      if (!data) {
        return rejectWithValue({
          message: "invalid username or password",
        });
      }
      return data?.isAccountExist;
    } catch (error) {
      // return rejectWithValue("Incorrect username or password");

      // menjadi action.payload yang ada di error handler reducer index.js
      return rejectWithValue(error.response ? error.response?.data.err : error);
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
      console.error(error.response ? error.response?.data.err : error);
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
      return rejectWithValue(error.response ? error.response.data.err : error);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/", payload);

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
      const response = await api.put("/auth/forgotPass", payload);
      return response.message;
    } catch (error) {
      return rejectWithValue(error.response ? error.response?.data : error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.setItem("token", payload.token);
      const response = await api.patch("/auth/resetPass", payload.data);
      Toast.success(response?.data?.message);
    } catch (error) {
      Toast.error(error?.message);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("/auth/changePass", payload);
      Toast.success(data.message);
    } catch (error) {
      Toast.error(error.response ? error.response.data.err : error);

      return rejectWithValue(error.response ? error.response.data.err : error);
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
      return data.message;
    } catch (error) {
      Toast.error(error.response ? error.response.data : error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.patch("auth/changeEmail", payload);
      Toast.success(data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      return data;
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
      // localStorage.setItem("token", payload);
      await api.patch("/auth/verify");

      return;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response?.data?.err : error
      );
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
      Toast.error(error.response ? error.response?.data : error);

      return rejectWithValue(error.response ? error.response?.data : error);
    }
  }
);
