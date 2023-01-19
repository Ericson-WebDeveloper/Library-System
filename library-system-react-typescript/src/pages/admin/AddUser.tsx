import React from "react";
import { faSave, faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { imageToBas64 } from "../../helper/ImageHelper";
import { useEffect } from "react";
import axios from "../../axios/axios";
import { toast } from "react-toastify";
import { useRef } from "react";
import { expiredTokenError } from "../../helper/ErrorHandler";
import Spinner from "../../components/Spinner";
import { generateP } from "../../helper/GeneratePass";
import { userRegister2 } from "../../stores/user/UserActions";
import {
  SET_MESSAGE_SUCCESS,
  SET_USER_ERROR,
} from "../../stores/user/UserSlice";
import ErrorHooksNotif from "../../helper/hooks/ErrorHooksNotif";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { Role } from "../../models/Role";

type AddUserProps = {};

export interface AddUserInterface {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phone: string;
  // password: '',
  avatar: string;
}

const AddUser = (props: AddUserProps) => {
  const shouldRun = useRef(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const {
    error: userError,
    errors: userErrors,
    user_loading,
    success_message,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState("");
  const [user, setUser] = useState<AddUserInterface>({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    phone: "",
    // password: '',
    avatar: "",
  });

  const [roles, setRole] = useState<Role[]>([]);

  const { firstname, lastname, middlename, email, phone, avatar } = user;

  const imageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageToBas64(e.target, (image) => {
      setUser((prev) => ({ ...prev, avatar: image ? String(image) : "" }));
    });
  };

  const reset = () => {
    setUser({
      firstname: "",
      lastname: "",
      middlename: "",
      email: "",
      phone: "",
      avatar: "",
    });
    setSelectedRole("");
  };

  const registerUser = () => {
    const password = generateP(10);
    const datas: AddUserInterface & { password: string; role: string } = {
      firstname,
      lastname,
      middlename,
      email,
      phone,
      avatar,
      password,
      role: selectedRole,
    };
    dispatch(userRegister2(datas));
  };

  useEffect(() => {
    const fetchRoles = () => {
      if (shouldRun.current) {
        shouldRun.current = false;
        setLoadingPage(true);
        axios
          .get(`/api/library-system/backend/role-list`)
          .then(({ data }) => {
            setRole(data.roles);
            setLoadingPage(false);
          })
          .catch((error) => {
            setLoadingPage(false);
            if (error.response.status === 401) {
              // create handling 401 status;
              // force logout
              // and 403 also
            } else if (error.response.status === 403) {
              expiredTokenError(error, dispatch);
              return;
            } else {
              toast.error(`${error.response.data.message}`, {
                theme: "dark",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
              });
              return;
            }
          });
      }
    };
    fetchRoles();
  }, [dispatch]);

  ErrorHooksNotif(
    userErrors,
    userError,
    success_message,
    SET_USER_ERROR,
    SET_MESSAGE_SUCCESS,
    reset
  );

  if (loadingPage || user_loading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col p-6 pt-8 space-y-6 w-8/12">
        <h1 className="text-4xl font-semibold font-serif">New User(s)</h1>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={firstname}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={lastname}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Middle Name
          </label>
          <input
            type="text"
            name="middlename"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={middlename}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Phone/Cell No#
          </label>
          <input
            type="text"
            name="phone"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={phone}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            }
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Avatar
          </label>
          <input
            type="file"
            onChange={imageCapture}
            className="w-[450px] px-4 py-4 rounded-lg bg-white"
          />
        </div>
        {avatar && (
          <div className="flex space-x-3 items-center justify-end">
            <img src={avatar} alt="" />
          </div>
        )}
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Role
          </label>
          <select
            name="role"
            id="role"
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-[450px] px-4 py-4 rounded-lg bg-white"
          >
            <option value={selectedRole} className="px-4 py-4 rounded-lg">
              Select Role
            </option>
            {roles.length > 0 &&
              roles.map((role, index) => {
                return (
                  <option
                    className="px-4 py-4 rounded-lg"
                    value={role._id}
                    key={index}
                  >
                    {role?.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex space-x-3 justify-center">
          <button
            type="button"
            onClick={registerUser}
            className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
          >
            <FontAwesomeIcon icon={faSave} /> Submit
          </button>
          <button className="p-2 py-2 px-6 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-400">
            <FontAwesomeIcon icon={faTurnDown} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
