import axios from "../../axios/axios";
import { expiredTokenError } from "../../helper/ErrorHandler";
import {
  SET_LOAN,
  SET_LOANS_LIST,
  SET_LOANS_OF_USER,
  SET_LOAN_ADMIN_DASH,
  SET_LOAN_ERRORS,
  SET_LOAN_LOADING,
  SET_LOAN_SUCCESS,
} from "./loanSlice";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Loan } from "../../models/Loan";
import { Book } from "../../models/Book";
import { Role } from "../../models/Role";
import { User } from "../../models/User";
import { LoanBookInterface } from "../../pages/admin/AddLoan";

export const makeBorrowedBook =
  (datas: LoanBookInterface) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_LOAN_LOADING(true));
      let { data } = await axios.post(
        `/api/library-system/backend/loan/create-borrowed/request`,
        datas
      );
      dispatch(SET_LOAN_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_LOAN_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_LOAN_LOADING(false));
    }
  };

export const getLoanEdit =
  (id: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_LOAN_LOADING(true));
      let { data } = await axios.get(`/api/library-system/backend/loan/${id}`);
      dispatch(SET_LOAN(data.loan));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_LOAN_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_LOAN_LOADING(false));
    }
  };

export const GetLoanDashData = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(SET_LOAN_LOADING(true));
    let { data } = await axios.get(
      `/api/library-system/backend/loan/loan-dashboard/counts`
    );
    dispatch(SET_LOAN_ADMIN_DASH(data.loanscount[0]));
  } catch (error: any) {
    if (error.response.status === 422) {
      dispatch(
        SET_LOAN_ERRORS({ errors: error.response?.data.errors, error: null })
      );
      return;
    } else if (error.response.status === 400) {
      dispatch(
        SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
      );
      return;
    } else if (error.response.status === 401) {
      // create handling 401 status;
      // force logout
      // and 403 also
    } else if (error.response.status === 403) {
      expiredTokenError(error, dispatch);
      return;
    } else {
      dispatch(
        SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
      );
      return;
    }
  } finally {
    dispatch(SET_LOAN_LOADING(false));
  }
};

export const SendEmailLoan =
  (id: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_LOAN_LOADING(true));
      let { data } = await axios.put(
        `/api/library-system/backend/loan/send-email/${id}`
      );
      dispatch(SET_LOAN_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_LOAN_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_LOAN_LOADING(false));
    }
  };

export const LoanUpdating =
  (id: string, datas: Loan<User<Role>, Book>) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_LOAN_LOADING(true));
      let { data } = await axios.put(
        `/api/library-system/backend/loan/update/${id}`,
        datas
      );
      dispatch(SET_LOAN(data.loan));
      dispatch(SET_LOAN_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_LOAN_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_LOAN_LOADING(false));
    }
  };

export const LoanListRequest =
  (page: number = 1, search: null | string = null) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      let urlExt = search ? `${search}&page=${page}` : `page=${page}`;
      // let url =  page ? `/api/library-system/backend/loan/list?page=${page}` : `/api/library-system/backend/loan/list`
      dispatch(SET_LOAN_LOADING(true));
      let { data } = await axios.get(
        `/api/library-system/backend/loan/list?${urlExt}`
      );
      dispatch(SET_LOANS_LIST(data.loans));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_LOAN_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_LOAN_LOADING(false));
    }
  };

export const LoanListUserRequest =
  (page: number = 1, user_id: string = "", search: string | null = null) =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
      // let urlExt =  page ? `?page=${page}` : ``;
      let urlExt = search ? `?${search}&page=${page}` : `?page=${page}`;
      // urlExt = page ? `${urlExt}&page=${page}` : urlExt;
      dispatch(SET_LOAN_LOADING(true));
      let { data } = await axios.get(
        `/api/library-system/backend/loan/loans-user/${user_id}${urlExt}`
      );
      dispatch(SET_LOANS_OF_USER(data.loans));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_LOAN_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      } else if (error.response.status === 401) {
        // create handling 401 status;
        // force logout
        // and 403 also
      } else if (error.response.status === 403) {
        expiredTokenError(error, dispatch);
        return;
      } else {
        dispatch(
          SET_LOAN_ERRORS({ error: error.response?.data.message, errors: null })
        );
        return;
      }
    } finally {
      dispatch(SET_LOAN_LOADING(false));
    }
  };
