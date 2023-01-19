// import { useMemo } from 'react';
import { toast } from "react-toastify";

export const returnErrorNotif = (errorMsg: string) => {
  toast.error(`${errorMsg}`, {
    theme: "dark",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
  });
};

export const returnErrorsNotif = (errors: Array<unknown>) => {
  let keys = Object.keys(errors);
  keys.forEach((key) => {
    // if(key in errors) {
    //     let e = errors[key];
    toast.error(`The ${errors[key].param} ${errors[key].msg}`, {
      theme: "dark",
      autoClose: 10000,
      closeOnClick: true,
    });
    // }
  });
};

export const returnSuccessNotif = (successMessage: string) => {
  toast.success(`${successMessage}`, {
    theme: "dark",
    autoClose: 10000,
    closeOnClick: true,
  });
};

export const returnPageNumber = (page: URLSearchParams): number => {
  return page.get("page") ? Number(page.get("page")) : 1;
};
