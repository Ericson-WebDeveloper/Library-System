import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import axios from "../../axios/axios";
import { expiredTokenError } from "../../helper/ErrorHandler";
import { AddBookFormInterface } from "../../pages/admin/AddBook";
import { EditFormInterface } from "../../pages/admin/EditBook";
import {
  SET_BOOK,
  SET_BOOKS,
  SET_BOOKS_COUNT_DASH,
  SET_BOOK_ERRORS,
  SET_BOOK_LOADING,
  SET_BOOK_SUCCESS,
} from "./BookSlice";

export const AddNewBook =
  (datas: AddBookFormInterface & { categories: Array<string> }) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_BOOK_LOADING(true));
      let { data } = await axios.post(
        `/api/library-system/backend/admin/book/add-new`,
        datas
      );
      dispatch(SET_BOOK_SUCCESS(data.message));
      console.info(data); // push to new data
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.response.status === 422) {
          dispatch(
            SET_BOOK_ERRORS({
              errors: error.response?.data.errors,
              error: null,
            })
          );
          return;
        } else if (error.response.status === 400) {
          dispatch(
            SET_BOOK_ERRORS({
              errors: null,
              error: error.response?.data.message,
            })
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
            SET_BOOK_ERRORS({
              errors: null,
              error: error.response?.data.message,
            })
          );
          return;
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
        dispatch(SET_BOOK_ERRORS({ error: error.request, errors: null }));
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        dispatch(SET_BOOK_ERRORS({ error: error.message, errors: null }));
        return;
      }
    } finally {
      dispatch(SET_BOOK_LOADING(false));
    }
  };

export const RemovingBook =
  (bookid: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_BOOK_LOADING(true));
      let { data } = await axios.delete(
        `/api/library-system/backend/admin/book/delete/${bookid}`
      );
      dispatch(SET_BOOK_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_BOOK_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
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
          SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
        );
        return;
      }
    } finally {
      dispatch(SET_BOOK_LOADING(false));
    }
  };

export const GetBooksDashData = () => async (dispatch: Dispatch<AnyAction>) => {
  try {
    dispatch(SET_BOOK_LOADING(true));
    let {
      data: { datas },
    } = await axios.get(
      `/api/library-system/backend/admin/book/book-dashboard/counts`
    );
    dispatch(SET_BOOKS_COUNT_DASH({ ...datas[0] }));
  } catch (error: any) {
    if (error.response.status === 422) {
      dispatch(
        SET_BOOK_ERRORS({ errors: error.response?.data.errors, error: null })
      );
      return;
    } else if (error.response.status === 400) {
      dispatch(
        SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
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
        SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
      );
      return;
    }
  } finally {
    dispatch(SET_BOOK_LOADING(false));
  }
};

export const getAllBooks =
  (page = 1, search: string | null = null) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      // serach change to post
      let urlExt = search ? `${search}&page=${page}` : `page=${page}`;
      dispatch(SET_BOOK_LOADING(true));
      let { data } = await axios.get(
        `/api/library-system/backend/admin/book/all-books?${urlExt}`
      );
      dispatch(SET_BOOKS(data.books));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_BOOK_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
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
          SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
        );
        return;
      }
    } finally {
      dispatch(SET_BOOK_LOADING(false));
    }
  };

export const bookSearch = async (search: string) => {
  return await axios.post(
    `/api/library-system/backend/admin/book/book-search/details`,
    { search }
  );
};

export const updateBook =
  (id: string, datas: EditFormInterface & { categories: Array<string> }) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_BOOK_LOADING(true));
      let { data } = await axios.put(
        `/api/library-system/backend/admin/book/book-update/${id}`,
        datas
      );
      dispatch(SET_BOOK_SUCCESS(data.message));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_BOOK_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
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
          SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
        );
        return;
      }
    } finally {
      dispatch(SET_BOOK_LOADING(false));
    }
  };

export const getBook =
  (id: string) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(SET_BOOK_LOADING(true));
      let { data } = await axios.get(
        `/api/library-system/backend/admin/book/book-${id}`
      );
      dispatch(SET_BOOK(data.book));
      // return data;
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_BOOK_ERRORS({ errors: error.response?.data.errors, error: null })
        );
        return;
      } else if (error.response.status === 400) {
        dispatch(
          SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
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
          SET_BOOK_ERRORS({ errors: null, error: error.response?.data.message })
        );
        return;
      }
    } finally {
      dispatch(SET_BOOK_LOADING(false));
    }
  };
