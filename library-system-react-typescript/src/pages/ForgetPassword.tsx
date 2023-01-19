import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios/axios";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

type ForgetPasswordProps = {};

const ForgetPassword = (props: ForgetPasswordProps) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const { email } = formData;

  const submitRequest = async () => {
    try {
      if (email === "") {
        return false;
      }
      setLoading(true);
      await axios.post(
        `/api/library-system/backend/user/reset-password/request`,
        { email }
      );
      toast.success(`Request Success. Check email`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      toast.error(`Request Failed. Try Again`, {
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
          </div>

          <button
            type="button"
            onClick={submitRequest}
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

export default ForgetPassword;
