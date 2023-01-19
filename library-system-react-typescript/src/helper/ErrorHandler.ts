import { AnyAction, Dispatch } from "@reduxjs/toolkit";
// import { Navigate } from 'react-router-dom'; //useLocation
import { SET_RENEW_TOKEN_MODAL_ACTIVE } from "../stores/indexSlice";
import { deleteToken } from "./AuthHelper";

export const unauthenticatederror = () => {
  const promt = prompt(
    "You Have not Token & refresh token. you are forcely to logout"
  );
  if (promt) {
    deleteToken();
    // <Navigate to='/' replace />
    window.location.replace("/");
  } else {
    deleteToken();
    // <Navigate to='/' replace />
    window.location.replace("/");
  }
};

export const expiredTokenError = (
  error: any,
  dispatch: Dispatch<AnyAction>
): void => {
  if (error.response.status === 403) {
    if (
      error.response?.data?.status_code &&
      error.response.data.status_code === 4033
    ) {
      dispatch(SET_RENEW_TOKEN_MODAL_ACTIVE());
    }
  }
};
