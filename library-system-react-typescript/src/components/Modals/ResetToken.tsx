import React from "react";
import { SET_RENEW_TOKEN_MODAL_DEACTIVE } from "../../stores/indexSlice";
// import {useDispatch, useSelector} from 'react-redux';
import {
  refreshTokenRequest,
  userLogout2,
} from "../../stores/user/UserActions";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { SET_USER_LOADING } from "../../stores/user/UserSlice";
import { useAppDispatch, useAppSelector } from "../../stores/store";

type ResetTokenProps = {
  show: boolean;
};

const ResetToken = ({ show }: ResetTokenProps) => {
  const dispatch = useAppDispatch();
  const { user_loading } = useAppSelector((state) => state.user);

  const closeModalLogout = async () => {
    // call logout
    dispatch(SET_USER_LOADING(true));
    await dispatch(userLogout2());
    setInterval(() => {
      dispatch(SET_RENEW_TOKEN_MODAL_DEACTIVE());
      dispatch(SET_USER_LOADING(false));
      window.location.reload();
    }, 2000);
  };

  const requestRenewToken = async () => {
    try {
      dispatch(SET_USER_LOADING(true));
      await dispatch(refreshTokenRequest());
      dispatch(SET_RENEW_TOKEN_MODAL_DEACTIVE());
      toast.success(`Token Refresh Success`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      // force logout
      await dispatch(userLogout2());
      window.location.reload();
    } finally {
      dispatch(SET_USER_LOADING(false));
    }
  };

  return (
    <div
      id="ViewUsertModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${!show ? "hidden" : show} 
      fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full transition delay-150 duration-300 ease-in-out overflow-y-scroll`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Renew Your Token
            </h3>

            <button
              onClick={() => closeModalLogout()}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 
                                10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {user_loading ? (
            <>
              <Spinner crl="Blue" loading={true} />
              <br />
              <br />
              <br />
              <div className="mb-12">{` `}</div>
            </>
          ) : (
            <>
              <div className="px-6 py-3 flex flex-col space-y-2">
                <h1 className="text-white text-2xl font-semibold">
                  Your Token Authentication was Expired. need to renew your
                  token? if yes click submit. if no click cancel to logout.
                </h1>
              </div>

              <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={() => requestRenewToken()}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                        dark:focus:ring-blue-800"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => closeModalLogout()}
                  className="text-gray-500 bg-white hover:bg-gray-100 
                            focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm 
                            font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 
                            dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetToken;
