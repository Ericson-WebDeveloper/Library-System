import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  SET_AUTH,
  SET_MESSAGE_SUCCESS,
  SET_USER_ERROR,
  SET_USER_LOADING,
} from "../stores/user/UserSlice";
import { toast } from "react-toastify";
import { userlogin } from "../stores/user/UserActions";
import { useAppDispatch, useAppSelector } from "../stores/store";
import BoxSpinner from "../components/Spinners/BoxSpinner";

type LoginProps = {};

export interface FormLoginInterface {
  email: string;
  password: string;
  as: "admin" | "user";
}

const Login = (props: LoginProps) => {
  const dispatch = useAppDispatch();
  const {
    error: userError,
    errors: userErrors,
    user_loading,
    success_message,
  } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<FormLoginInterface>({
    email: "",
    password: "",
    as: "admin",
  });

  const { email, password, as } = formData;

  const onLogIn = async () => {
    try {
      if (!email || !password || !as) {
        toast.error(`Credentials Data Required`, {
          theme: "dark",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
        });
        return false;
      }
      const datas: FormLoginInterface = { email, password, as };
      dispatch(SET_USER_LOADING(true));
      let { data } = await userlogin(datas);
      dispatch(SET_AUTH({ user: data.user, redirect: true }));
    } catch (error: any) {
      if (error.response.status === 422) {
        dispatch(
          SET_USER_ERROR({ error: null, errors: error.response.data.errors })
        );
      } else if (error.response.status === 400) {
        dispatch(
          SET_USER_ERROR({ error: error.response.data.message, errors: null })
        );
      } else {
        dispatch(
          SET_USER_ERROR({
            error: "Server Error. Plaese Try Again Later",
            errors: null,
          })
        );
      }
    } finally {
      let intrval = setInterval(() => {
        dispatch(SET_USER_LOADING(false));
        clearInterval(intrval);
      }, 1000);
    }
  };

  useEffect(() => {
    if (userError) {
      let errorMsg = userError;
      dispatch(SET_USER_ERROR({ error: null, errors: null }));
      toast.error(`${errorMsg}`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }

    if (userErrors) {
      let errors = userErrors;
      dispatch(SET_USER_ERROR({ error: null, errors: null }));
      let keys = Object.keys(errors);
      keys.forEach((key) => {
        toast.error(`${errors[key][0]}`, {
          theme: "dark",
          autoClose: 10000,
          closeOnClick: true,
        });
      });
    }

    if (success_message) {
      let successMessage = success_message;
      dispatch(SET_MESSAGE_SUCCESS(null));
      toast.success(`${successMessage}`, {
        theme: "dark",
        autoClose: 10000,
        closeOnClick: true,
      });
    }
  }, [dispatch, userError, success_message, userErrors]);

  if (user_loading) {
    // return <Spinner crl='Blue' loading={true} />
    return <BoxSpinner />;
  }

  return (
    <div className="h-full w-full flex">
      <div className="w-full h-screen bg-auto bg-center dark:bg-login-bg hidden lg:block"></div>

      <div className="w-full h-screen bg-gray-50 px-12 py-24">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col lg:flex-row justify-center items-center mb-14">
            <h1 className="text-4xl lg:text-6xl xl:text-8xl font-serif font-bold text-center">
              Library System
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="min-h-24 min-w-18"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 
                  7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
              />
            </svg>
          </div>

          <div className="flex flex-col w-full space-y-6">
            <input
              type="text"
              name="email"
              className="p-2 border-[2px] border-gray-400 rounded-md"
              value={email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="email"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="p-2 border-[2px] border-gray-400 rounded-md"
              placeholder="password"
            />
          </div>

          <div className="flex w-full items-center">
            <h2 className="text-2xl mr-4">Sign In As:</h2>
            <div className="flex mr-4 justify-center items-center">
              <input
                type="radio"
                name="role"
                id="admin"
                checked={as === "admin"}
                className="align-middle"
                value="admin"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, as: "admin" }))
                }
              />
              <label className="text-2xl text-blue-400" htmlFor="admin">
                Librarian
              </label>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="role"
                id="user"
                checked={as === "user"}
                value="user"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, as: "user" }))
                }
              />
              <label className="text-2xl text-blue-400" htmlFor="user">
                Student
              </label>
            </div>
          </div>

          <div className="flex w-full justify-between items-center">
            <div className="flex items-center">
              <input type="checkbox" id="rem" />
              <label className="text-2xl text-blue-400" htmlFor="rem">
                Remember Me
              </label>
            </div>
            <Link className="text-2xl text-blue-400" to="/forget-password">
              Forget Password
            </Link>
          </div>

          <button
            type="button"
            onClick={onLogIn}
            className="w-full p-2 py-2 bg-blue-700 rounded-lg text-xl font-bold text-gray-100"
          >
            Login
          </button>

          <Link className="text-xl text-blue-600" to="/signup">
            Don't have an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
