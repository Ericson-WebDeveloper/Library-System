import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { expiredTokenError } from "../../helper/ErrorHandler";
import { AddUserInterface } from "../../pages/admin/AddUser";
import { FormLoginInterface } from "../../pages/Login";
import { ProfielFormInterface } from "../../pages/Profile";
import {
  SET_AUTH_LOADING,
  SET_GLOBAL_LOADING,
  SET_RENEW_TOKEN_MODAL_ACTIVE,
  SET_RENEW_TOKEN_MODAL_DEACTIVE,
  UNSET_AUTH_LOADING,
} from "../indexSlice";
import {
  SET_AUTH,
  SET_DASHBOARD_DATAS,
  SET_LOANUSER_DASH,
  SET_LOGOUT,
  SET_MESSAGE_SUCCESS,
  SET_UPDATEUSER_UPDATE,
  SET_UPDATE_PROFILE,
  SET_USERS_LIST,
  SET_USER_ERROR,
  SET_USER_LOADING,
  SET_USER_VIEW,
} from "./UserSlice";

export const userlogin = async (data: FormLoginInterface) => {
  return await axios.post("/api/library-system/backend/sign-in", data);
};

export const userRegister = async (datas: FormData) => {
  return await axios.post("/api/library-system/backend/sign-up", datas);
};

export const userRegister2 =
  (datas: AddUserInterface & { password: string; role: string }) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_USER_LOADING(true));
      let { data } = await axios.post(
        "/api/library-system/backend/admin/user/register",
        datas
      );
      dispatch(SET_MESSAGE_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.response.status === 422) {
          dispatch(
            SET_USER_ERROR({ errors: error.response?.data.errors, error: null })
          );
          return;
        } else if (error.response.status === 400) {
          dispatch(
            SET_USER_ERROR({
              error: error.response?.data.message,
              errors: null,
            })
          );
          return;
        } else if (error.response.status === 401) {
          // create handling 401 status;
          // force logout
          // and 403 also
        } else if (error.response.status === 404) {
          dispatch(
            SET_USER_ERROR({ error: "Request cannot be process", errors: null })
          );
          return;
        } else if (error.response.status === 403) {
          // dispatch(expiredTokenError(error));
          expiredTokenError(error, dispatch);
          return;
        } else {
          dispatch(
            SET_USER_ERROR({
              error: error.response?.data.message,
              errors: null,
            })
          );
          return;
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
        dispatch(SET_USER_ERROR({ error: error.request, errors: null }));
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        dispatch(SET_USER_ERROR({ error: error.message, errors: null }));
        return;
      }
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

export const userGetById =
  (id: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_USER_LOADING(true));
      let { data } = await axios.get(
        `/api/library-system/backend/admin/user-details/${id}`
      );
      dispatch(SET_USER_VIEW(data.user));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_USER_ERROR({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 404) {
        dispatch(
          SET_USER_ERROR({ error: "Request cannot be process", errors: null })
        );
        return;
      } else if (error.response.status === 403) {
        // dispatch(expiredTokenError(error));
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

export const users =
  (page: number = 1, search: null | string = null) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      // let urlExt =  page ? `/api/library-system/backend/admin/user-list?page=${page}` : `/api/library-system/backend/admin/user-list`
      let urlExt = search ? `${search}&page=${page}` : `page=${page}`;
      dispatch(SET_USER_LOADING(true));
      let { data } = await axios.get(
        `/api/library-system/backend/admin/user-list?${urlExt}`
      );
      dispatch(SET_USERS_LIST(data.users));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_USER_ERROR({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 404) {
        dispatch(
          SET_USER_ERROR({ error: "Request cannot be process", errors: null })
        );
        return;
      } else if (error.response.status === 403) {
        // dispatch(expiredTokenError(error));
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

export const updatingProfileUser =
  (datas: ProfielFormInterface) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_USER_LOADING(true));
      let { data } = await axios.put(
        `/api/library-system/backend/admin/profile-update`,
        datas
      );
      dispatch(SET_UPDATE_PROFILE(data.user));
      dispatch(SET_MESSAGE_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_USER_ERROR({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        // dispatch(expiredTokenError(error));
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

export const resetWarningUser =
  (id: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_USER_LOADING(true));
      let { data } = await axios.put(
        `/api/library-system/backend/admin/user-warning/reset/${id}`
      );
      dispatch(
        SET_UPDATEUSER_UPDATE({ userId: data.user._id, user: data.user })
      );
      dispatch(SET_MESSAGE_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_USER_ERROR({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        // dispatch(expiredTokenError(error));
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

export const updatingProfileUserAvatar =
  (datas: { avatar: string }) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_USER_LOADING(true));
      let { data } = await axios.put(
        `/api/library-system/backend/admin/profile-update/avatar`,
        datas
      );
      dispatch(SET_UPDATE_PROFILE(data.user));
      dispatch(SET_MESSAGE_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_USER_ERROR({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        // dispatch(expiredTokenError(error));
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

export const userMe = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(SET_AUTH_LOADING());
    let { data } = await axios.get(`/api/library-system/backend/user-me`);
    if (!localStorage.getItem("auth_user_")) {
      dispatch(SET_AUTH({ user: data.user, redirect: false }));
    }
    dispatch(SET_RENEW_TOKEN_MODAL_DEACTIVE());
    return true;
  } catch (error) {
    // dispatch(expiredTokenError(error));
    expiredTokenError(error, dispatch);
    return false;
  } finally {
    dispatch(UNSET_AUTH_LOADING());
  }
};

export const adminDashBoardDatas =
  () => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_USER_LOADING(true));
      let { data } = await axios.get(
        `/api/library-system/backend/admin/dashboard-datas`
      );
      dispatch(
        SET_DASHBOARD_DATAS({
          users: data.users[0]?.User_count ?? 0,
          librarians: data.librarians[0]?.Librarian_count ?? 0,
        })
      );
    } catch (error) {
      // dispatch(expiredTokenError(error));
      expiredTokenError(error, dispatch);
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

export const userLoanDashBoardDatas =
  (id: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_USER_LOADING(true));
      let { data } = await axios.get(
        `/api/library-system/backend/admin/dashboard-datas/user/${id}`
      );
      dispatch(SET_LOANUSER_DASH(data.loancount));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_USER_ERROR({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        // let response = expiredTokenError(error);
        // if(response) dispatch(SET_RENEW_TOKEN_MODAL_ACTIVE());
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_USER_ERROR({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

export const userLogout = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch(SET_GLOBAL_LOADING(true));
  await axios.post(`/api/library-system/backend/logout`);
  dispatch(SET_LOGOUT());
  dispatch(SET_GLOBAL_LOADING(false));
  return;
};

export const userLogout2 = () => async (dispatch: Dispatch<AnyAction>) => {
  dispatch(SET_GLOBAL_LOADING(true));
  await axios.post(`/api/library-system/backend/logout-force/backup-route`);
  dispatch(SET_LOGOUT());
  dispatch(SET_GLOBAL_LOADING(false));
  return;
};

export const refreshTokenRequest =
  () => async (dispatch: Dispatch<AnyAction>) => {
    return axios.get(`/api/library-system/backend/refresh-authetication`);
  };

export const userSearch = async (search: string) => {
  return await axios.post(
    `/api/library-system/backend/admin/user-search/details`,
    { search }
  );
};

// export const autheticate = () => async(dispatch) => {
//     try {

//     } catch (error) {

//     }
// }
