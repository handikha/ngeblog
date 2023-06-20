import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-hot-toast";

import {
  login,
  keepLogin,
  logout,
  register,
  updateImageProfile,
  resetPassword,
  verifyAccount,
  forgotPassword,
  changeUsername,
  changePhoneNumber,
} from "./slices";

// @import schema validation

const INITIAL_STATE = {
  isLoginLoading: false,
  isKeepLoginLoading: false,
  isRegisterLoading: false,
  isLogoutLoading: false,
  isUploadImageLoading: false,
  isForgotPasswordLoading: false,
  isResetPasswordLoading: false,
  isChangeUsernameLoading: false,
  isChangePhoneNumberLoading: false,
  id: null,
  username: "",
  email: "",
  phone: "",
  imgProfile: null,
  isVerified: false,
  role: "",
  token: null,
  error: null,
  success: null,
};

// global error handler
export const isErrorOccured = (action) => {
  return action.type.endsWith("rejected");
};

// auth success
const isAuthSuccess = (action) => {
  return [
    login.fulfilled.type,
    keepLogin.fulfilled.type,
    register.fulfilled.type,
    forgotPassword.fulfilled.type,
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
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = true;
        state.error = action.payload;
      })

      .addCase(keepLogin.pending, (state, action) => {
        state.isKeepLoginLoading = true;
      })

      .addCase(logout.pending, (state, action) => {
        state.isLogoutLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state = Object.assign(state, INITIAL_STATE);
      })

      .addCase(register.pending, (state, action) => {
        state.isRegisterLoading = true;
      })

      .addCase(verifyAccount.pending, (state, action) => {
        state.isRegisterLoading = true;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isRegisterLoading = false;
        state.isVerified = true;
      })

      .addCase(forgotPassword.pending, (state, action) => {
        state.isForgotPasswordLoading = true;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.isForgotPasswordLoading = false;
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.isResetPasswordLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isResetPasswordLoading = false;
      })

      .addCase(changeUsername.pending, (state, action) => {
        state.isChangeUsernameLoading = true;
      })
      .addCase(changeUsername.fulfilled, (state, action) => {
        state.isChangeUsernameLoading = false;
        state.success = action.payload;
      })
      .addCase(changeUsername.rejected, (state, action) => {
        state.isChangeUsernameLoading = false;
        state.error = action.payload;
      })

      .addCase(changePhoneNumber.pending, (state, action) => {
        state.isChangePhoneNumberLoading = true;
      })
      .addCase(changePhoneNumber.fulfilled, (state, action) => {
        state.isChangePhoneNumberLoading = false;
      })
      .addCase(changePhoneNumber.rejected, (state, action) => {
        state.isChangePhoneNumberLoading = false;
        state.error = action.payload;
      })

      .addCase(updateImageProfile.pending, (state, action) => {
        state.isUploadImageLoading = true;
      })
      .addCase(updateImageProfile.fulfilled, (state, action) => {
        state.isUploadImageLoading = false;
        state.imgProfile = action.payload;
      })
      .addCase(updateImageProfile.rejected, (state, action) => {
        state.isUploadImageLoading = false;
      })

      // auth success handler
      .addMatcher(isAuthSuccess, (state, action) => {
        state.isKeepLoginLoading = false;
        state.isLoginLoading = false;
        state.isRegisterLoading = false;
        state.isForgotPasswordLoading = false;

        state.id = action.payload?.id;
        state.username = action.payload?.username;
        state.phone = action.payload?.phone;
        state.imgProfile = action.payload?.imgProfile;
        state.email = action.payload?.email;
        state.role = action.payload?.role;
        state.isVerified = action.payload?.isVerified;
        state.token = action.payload;
      })

      // error handler
      .addMatcher(isErrorOccured, (state, action) => {
        state.isKeepLoginLoading = false;
        state.isLoginLoading = false;
        state.isLogoutLoading = false;
        state.isRegisterLoading = false;
        state.isUploadImageLoading = false;
        state.isForgotPasswordLoading = false;
        state.isResetPasswordLoading = false;

        // console.error(action.payload);
      });
  },
});

export default authSlice.reducer;
