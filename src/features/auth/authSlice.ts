import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AuthDetails } from "devstream/aurelia/types";

type AuthSliceStateType = {
  details?: AuthDetails;
  loginTime?: Date;
  isLoggedIn: boolean;
};

const initialState: AuthSliceStateType = {
  details: undefined,
  loginTime: undefined,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ authDetails: AuthDetails; loginTime: Date }>) => {
      state.details = action.payload.authDetails;
      state.loginTime = action.payload.loginTime;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.details = undefined;
      state.loginTime = undefined;
      state.isLoggedIn = false;
    },
  },
  selectors: {
    selectIsLoggedIn: (state): boolean => {
      return state.isLoggedIn;
    },
    selectFullName: (state): string => {
      if (!state.isLoggedIn || !state.details) return "";
      // TODO: combine all name details to generate full name
      return state.details.firstName + " " + state.details.lastName;
    },
    selectUsername: (state): string => {
      if (!state.isLoggedIn || !state.details) return "";
      return state.details.username;
    },
    selectAccessToken: (state): string => {
      if (!state.isLoggedIn || !state.details) return "";
      return state.details.accessToken;
    },
    selectRefreshToken: (state): string => {
      if (!state.isLoggedIn || !state.details) return "";
      return state.details.refreshToken;
    },
    selectLoginTime: (state): Date | undefined => {
      return state.loginTime;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const {
  selectFullName,
  selectIsLoggedIn,
  selectUsername,
  selectAccessToken,
  selectRefreshToken,
  selectLoginTime,
} = authSlice.selectors;
export const authReducer = authSlice.reducer;
