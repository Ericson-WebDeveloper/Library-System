import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../axios/axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
// import moment from 'moment';

type Props = {};

const ResetPassword = (props: Props) => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const { email, token } = useParams();
  const { password, confirm_password } = passwords;

  const checkExpires = async () => {
    if (password.trim() === "" || confirm_password.trim() === "") {
      toast.error(`password requires.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return false;
    }

    if (password !== confirm_password) {
      toast.error(`Password not match.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return false;
    }

    try {
      setLoading(true);
      const datas = {
        email,
        token,
        password,
      };
      let { data } = await axios.post(
        `/api/library-system/backend/user/reset-password/submit`,
        datas
      );
      toast.success(`${data.message}.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error: any) {
      if (error.response.status === 422) {
        toast.error(
          `${error.response?.data.errors[0].param} ${error.response?.data.errors[0].msg}`,
          {
            theme: "dark",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
          }
        );
        return false;
      }
      toast.error(`${error.response?.data.message}.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner crl="Blue" loading={true} />;
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
              type="password"
              name="password"
              className="p-2 border-[2px] border-gray-400 rounded-md"
              value={password}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col w-full space-y-6">
            <input
              type="password"
              name="confirm_password"
              className="p-2 border-[2px] border-gray-400 rounded-md"
              value={confirm_password}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              placeholder="Confirm Password"
            />
          </div>

          <button
            type="button"
            onClick={checkExpires}
            className="w-full p-2 py-2 bg-blue-700 rounded-lg text-xl font-bold text-gray-100"
          >
            Submit Reset Password
          </button>

          <Link className="text-xl text-blue-600" to="/">
            Already have an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
