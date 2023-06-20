import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  keepLogin,
  logout,
  register,
  updateImageProfile,
  verifyAccount,
} from "./slices";
import { FaLastfmSquare } from "react-icons/fa";

// @import schema validation

const INITIAL_STATE = {
  isLoginLoading: false,
  isKeepLoginLoading: false,
  isRegisterLoading: false,
  isLogoutLoading: false,
  isUploadImageLoading: false,
  id: null,
  username: "",
  email: "",
  phone: "",
  imgProfile: null,
  isVerified: false,
  role: "",
  error: null,
};

// global error handler
const isErrorOccured = (action) => {
  return action.type.endsWith("rejected");
};

// auth success
const isAuthSuccess = (action) => {
  // conditional pattern
  // return (
  //   action.type === login.fulfilled.type ||
  //   action.type === keepLogin.fulfilled.type ||
  //   action.type === register.fulfilled.type
  // );

  return [
    login.fulfilled.type,
    keepLogin.fulfilled.type,
    register.fulfilled.type,
  ].includes(action.type);
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoginLoading = true;
        state.error = false;
      })
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoginLoading = false;
      //   state.id = action.payload?.id;
      //   state.username = action.payload?.username;
      //   state.phone = action.payload?.phone;
      //   state.imgProfile = action.payload?.imgProfile;
      //   state.email = action.payload?.email;
      //   state.role = action.payload?.role;
      //   state.isVerified = action.payload?.isVerified;
      // })

      // .addCase(login.rejected, (state, action) => {
      //   state.isLoginLoading = false;
      //   state.error = action.payload;
      // })
      .addCase(keepLogin.pending, (state, action) => {
        state.isKeepLoginLoading = true;
      })
      // .addCase(keepLogin.fulfilled, (state, action) => {
      //   state.isKeepLoginLoading = false;
      //   state.id = action.payload?.id;
      //   state.username = action.payload?.username;
      //   state.phone = action.payload?.phone;
      //   state.imgProfile = action.payload?.imgProfile;
      //   state.email = action.payload?.email;
      //   state.role = action.payload?.role;
      //   state.isVerified = action.payload?.isVerified;
      // })
      // .addCase(keepLogin.rejected, (state, action) => {
      //   state.isKeepLoginLoading = false;
      // })
      .addCase(logout.pending, (state, action) => {
        state.isLogoutLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state = Object.assign(state, INITIAL_STATE);
      })
      // .addCase(logout.rejected, (state, action) => {
      //   state.isLogoutLoading = false;
      // })
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      // .addCase(register.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.id = action.payload?.id;
      //   state.username = action.payload?.username;
      //   state.password = action.payload?.password;
      //   state.email = action.payload?.email;
      //   state.role = action.payload?.role;
      //   state.token = action.payload?.token;
      // })
      // .addCase(register.rejected, (state, action) => {
      //   state.loading = false;
      // })
      .addCase(verifyAccount.pending, (state, action) => {
        state.isRegisterLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.isVerified = true;
      })

      // auth success handler
      .addMatcher(isAuthSuccess, (state, action) => {
        state.isKeepLoginLoading = false;
        state.isLoginLoading = false;
        state.isRegisterLoading = false;
        state.id = action.payload?.id;
        state.username = action.payload?.username;
        state.phone = action.payload?.phone;
        state.imgProfile = action.payload?.imgProfile;
        state.email = action.payload?.email;
        state.role = action.payload?.role;
        state.isVerified = action.payload?.isVerified;
      })

      // error handler
      .addMatcher(isErrorOccured, (state, action) => {
        state.isKeepLoginLoading = false;
        state.isLoginLoading = false;
        state.isLogoutLoading = false;
        state.isRegisterLoading = false;
        state.isUploadImageLoading = false;

        console.error(action.payload);
      });
  },
});

export default authSlice.reducer;
