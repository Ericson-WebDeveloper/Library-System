import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteToken,
  getAuth,
  redirectByRole,
  setAsLogged,
  setLogout,
} from "../../helper/AuthHelper";
import { DatasWPage } from "../../models/DatasPage";
import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { RootState } from "../store";

interface UserState {
  auth: boolean;
  auth_user: User<Role> | null;
  error: any | null;
  errors: any | null;
  success_message: any | null;
  user_loading: boolean;

  users_count: number;
  users_count2: number;
  books_count: number;
  loans_count: number;

  user_loan_count: {
    total: number;
    current: number;
  };

  userList: DatasWPage<User<Role>> | null;
  user: User<Role> | null;
}

const initialState: UserState = {
  auth: getAuth(),
  // refresh_token: getRefreshToken(),
  // auth_token: getAuthToken(),
  auth_user: localStorage.getItem("auth_user_")
    ? JSON.parse(localStorage.getItem("auth_user_")!)
    : null,
  error: null,
  errors: null,
  success_message: null,
  user_loading: false,

  users_count: 0,
  users_count2: 0,
  books_count: 0,
  loans_count: 0,

  user_loan_count: {
    total: 0,
    current: 0,
  },

  userList: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_USER_LOADING: (state, action: PayloadAction<boolean>) => {
      state.user_loading = action.payload;
    },
    SET_UPDATEUSER_UPDATE: (
      state,
      action: PayloadAction<{ user: User<Role>; userId: string }>
    ) => {
      let index: number = state.userList?.data?.findIndex(
        (user) => action.payload.userId === user._id
      ) as number;
      state.userList!.data[index] = action.payload.user;
    },
    SET_USER_VIEW: (state, action: PayloadAction<User<Role>>) => {
      state.user = action.payload;
    },
    SET_LOANUSER_DASH: (state, action) => {
      state.user_loan_count.total = action.payload.Loan_Count;
      state.user_loan_count.current = action.payload.Loan_Current;
    },
    SET_AUTH: (
      state,
      action: PayloadAction<{ redirect: boolean; user: User<Role> }>
    ) => {
      localStorage.setItem("auth_user_", JSON.stringify(action.payload.user));
      setAsLogged();
      // state.user = action.payload.user;
      state.auth_user = action.payload.user;
      state.auth = true;
      if (action.payload.redirect) {
        window.location.replace(
          `${redirectByRole(action.payload.user.role as Role[])}`
        );
      }
    },
    SET_UPDATE_PROFILE: (state, action) => {
      // state.user = action.payload;
      state.auth_user = action.payload;
      state.auth = true;
      localStorage.setItem("auth_user_", JSON.stringify(action.payload));
    },
    SET_USER_ERROR: (
      state,
      action: PayloadAction<{ error: any; errors: any }>
    ) => {
      state.error = action.payload.error ? action.payload.error : null;
      state.errors = action.payload.errors ? action.payload.errors : null;
    },
    SET_MESSAGE_SUCCESS: (state, action: PayloadAction<any>) => {
      state.success_message = action.payload ? action.payload : null;
    },
    SET_LOGOUT: (state) => {
      deleteToken();
      setLogout();
      state.auth_user = null;
      state.auth = false;
    },

    SET_DASHBOARD_DATAS: (state, action) => {
      state.users_count = action.payload?.users ? action.payload.users : 0;
      state.users_count2 = action.payload?.librarians
        ? action.payload.librarians
        : 0;
      state.books_count = action.payload?.books ? action.payload.books : 0;
      state.loans_count = action.payload?.loans ? action.payload.loans : 0;
    },

    SET_USERS_LIST: (state, action) => {
      state.userList = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SET_AUTH,
  SET_USER_LOADING,
  SET_USER_ERROR,
  SET_MESSAGE_SUCCESS,
  SET_LOGOUT,
  SET_DASHBOARD_DATAS,
  SET_USERS_LIST,
  SET_UPDATE_PROFILE,
  SET_USER_VIEW,
  SET_LOANUSER_DASH,
  SET_UPDATEUSER_UPDATE,
} = userSlice.actions;

export const authuser = (state: RootState) => state.user.auth_user;
export const errorUser = (state: RootState) => state.user.error;
export const errorusers = (state: RootState) => state.user.errors;
export const usersuccessmessage = (state: RootState) =>
  state.user.success_message;
export const userloading = (state: RootState) => state.user.user_loading;
export const usercounts = (state: RootState) => state.user.users_count;
export const userlibrarianscount = (state: RootState) =>
  state.user.users_count2;
export const userbookscount = (state: RootState) => state.user.books_count;
export const userloancount = (state: RootState) => state.user.loans_count;

export default userSlice.reducer;
