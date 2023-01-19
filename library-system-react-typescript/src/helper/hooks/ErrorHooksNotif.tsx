// import React from 'react'
import { useEffect } from "react";
// import { useDispatch } from 'react-redux'
import { useAppDispatch } from "../../stores/store";
import {
  returnErrorNotif,
  returnErrorsNotif,
  returnSuccessNotif,
} from "../ToastMotification";

const ErrorHooksNotif = (
  Errors: any | null,
  Error: any | null,
  Success: any | null,
  SetError: any,
  SetSuccess: any,
  callback: Function | null = null
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Error) {
      let errorMsg = Error;
      dispatch(SetError({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }

    if (Errors) {
      let errors = Errors;
      dispatch(SetError({ error: null, errors: null }));
      returnErrorsNotif(errors);
    }

    if (Success) {
      let successMessage = Success;
      dispatch(SetSuccess(null));
      if (callback) {
        callback();
      }
      returnSuccessNotif(successMessage);
    }
  }, [dispatch, Error, Errors, Success, SetError, SetSuccess, callback]);

  return null;
};

export default ErrorHooksNotif;
