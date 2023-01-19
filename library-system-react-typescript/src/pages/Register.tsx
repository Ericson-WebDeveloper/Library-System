import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { imageToBas64 } from "../helper/ImageHelper";
import { userRegister } from "../stores/user/UserActions";
import { toast } from "react-toastify";
import bookLogo from "../assets/Books.jpg";

type RegisterProps = {};

export interface FormRegisterInterface {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
}

const Register = (props: RegisterProps) => {
  const [loading, setLoading] = useState(false);
  // neew to formdata wrapped the input fields
  const [user, setUser] = useState<FormRegisterInterface>({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
  });

  const { firstname, lastname, middlename, email, phone, password, avatar } =
    user;

  const imageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageToBas64(e.target, (image: string | ArrayBuffer | null) => {
      setUser((prev) => ({ ...prev, avatar: image ? String(image) : "" }));
    });
  };
  const resetForm = () => {
    setUser({
      firstname: "",
      lastname: "",
      middlename: "",
      email: "",
      phone: "",
      password: "",
      avatar: "",
    });
  };

  const register = async () => {
    try {
      const form = new FormData();
      form.append("firstname", firstname);
      form.append("lastname", lastname);
      form.append("middlename", middlename);
      form.append("email", email);
      form.append("phone", phone);
      form.append("password", password);
      form.append("avatar", avatar);
      setLoading(true);
      await userRegister(form);
      toast.success(`Register Complete. now you can login`, {
        theme: "dark",
        autoClose: 10000,
        closeOnClick: true,
      });
      resetForm();
    } catch (error: any) {
      if (error.response.status === 422) {
        let keys = Object.keys(error.response?.data.errors);
        keys.forEach((key) => {
          toast.error(
            `The ${error.response?.data.errors[key].param} ${error.response?.data.errors[key].msg}`,
            {
              theme: "dark",
              autoClose: 10000,
              closeOnClick: true,
            }
          );
        });
        return;
      } else if (error.response.status === 400) {
        toast.error(`${error.response?.data.message}`, {
          theme: "dark",
          autoClose: 10000,
          closeOnClick: true,
        });
        return;
      } else {
        toast.error(`${error.response?.data.message}`, {
          theme: "dark",
          autoClose: 10000,
          closeOnClick: true,
        });
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  // return spinner
  if (loading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="h-screen w-full">
      <div className="flex h-screen">
        <div className="w-full h-full bg-gray-50 px-12 py18 ">
          <div className="flex flex-col items-center space-y-4 mb-12">
            <div className="flex flex-col lg:flex-row justify-center items-center">
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
                name="firstname"
                className="p-2 border-[2px] border-gray-400 rounded-md"
                placeholder="First Name"
                value={firstname}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                name="lastname"
                className="p-2 border-[2px] border-gray-400 rounded-md"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                name="middlename"
                className="p-2 border-[2px] border-gray-400 rounded-md"
                placeholder="Middle Name"
                value={middlename}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {/* <input type="text" className='p-2 border-[2px] border-gray-400 rounded-md' placeholder='Student No#' /> */}
              <input
                type="text"
                name="email"
                className="p-2 border-[2px] border-gray-400 rounded-md"
                placeholder="email"
                value={email}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <input
                type="password"
                name="password"
                className="p-2 border-[2px] border-gray-400 rounded-md"
                placeholder="password"
                value={password}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                name="phone"
                className="p-2 border-[2px] border-gray-400 rounded-md"
                placeholder="Phone/Cell No#"
                value={phone}
                onChange={(e) =>
                  setUser((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              <input
                type="file"
                onChange={imageCapture}
                className="p-2 border-[2px] border-gray-400 rounded-md"
                placeholder="Avatar Profile"
              />
              {avatar && <img src={avatar} alt="" />}
            </div>

            <button
              type="button"
              onClick={register}
              className="w-full p-2 py-2 bg-blue-700 rounded-lg text-xl font-bold text-gray-100"
            >
              Register
            </button>

            <Link className="text-xl text-blue-600" to="/">
              Already have an Account
            </Link>
          </div>
        </div>
        {/*  */}
        <div className="w-ful h-full hidden lg:block ">
          <img className="object-cover w-full h-full" src={bookLogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
