import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import ProfileModal from "../components/ProfileModal";
import Spinner from "../components/Spinner";
import {
  returnErrorNotif,
  returnErrorsNotif,
  returnSuccessNotif,
} from "../helper/ToastMotification";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { updatingProfileUser } from "../stores/user/UserActions";
import { SET_MESSAGE_SUCCESS, SET_USER_ERROR } from "../stores/user/UserSlice";

type ProfileProps = {};

export interface ProfielFormInterface {
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  phone: string;
  password: string;
}

const Profile = (props: ProfileProps) => {
  const [showImageModal, setImageModal] = useState("");
  const dispatch = useAppDispatch();
  const {
    auth_user,
    user_loading,
    success_message: userSuccess,
    error: userError,
    errors: userErrors,
  } = useAppSelector((state) => state.user);
  const [profile, setProfile] = useState<ProfielFormInterface>({
    firstname: auth_user?.firstname ?? "",
    lastname: auth_user?.lastname ?? "",
    middlename: auth_user?.middlename ?? "",
    email: auth_user?.email ?? "",
    phone: auth_user?.details?.phone
      ? (auth_user?.details?.phone as string)
      : "",
    password: "",
  });
  const { firstname, lastname, middlename, email, phone, password } = profile;

  const update = () => {
    const datas = {
      ...profile,
    };
    dispatch(updatingProfileUser(datas));
  };

  useEffect(() => {
    if (userError) {
      let errorMsg = userError;
      dispatch(SET_USER_ERROR({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }

    if (userErrors) {
      let errors = userErrors;
      dispatch(SET_USER_ERROR({ error: null, errors: null }));
      returnErrorsNotif(errors);
    }

    if (userSuccess) {
      let successMessage = userSuccess;
      dispatch(SET_MESSAGE_SUCCESS(null));
      // window.location.reload();
      returnSuccessNotif(successMessage);
    }
  }, [dispatch, userError, userSuccess, userErrors]);

  if (user_loading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="h-screen w-full">
      <div className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[650px] flex mx-auto box-border">
        <div className="flex flex-col w-full justify-center items-center">
          <img
            src={
              auth_user?.details?.avatar
                ? (auth_user?.details?.avatar as string)
                : "https://via.placeholder.com/15"
            }
            onClick={() => setImageModal("block")}
            className="h-48 w-48 rounded-full cursor-pointer"
            alt=""
          />
          <div className="w-full flex flex-col mt-6">
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                FIrst Name
              </label>
              <input
                type="text"
                name="firstname"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="First Name"
                value={firstname}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Middle Name
              </label>
              <input
                type="text"
                name="middlename"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Middle Name"
                value={middlename}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Phone No#
              </label>
              <input
                type="text"
                name="phone"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Phone No# ex: 09xxxxxxxxxxx"
                value={phone}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center space-y-2">
              <label htmlFor="" className="text-2xl font-semibold font-mono">
                Password *optional
              </label>
              <input
                type="password"
                name="password"
                className="w-full md:w-[50%] p-[5px] border-[1px] rounded-lg border-gray-400 text-lg"
                placeholder="Password *optional"
                value={password}
                onChange={(e) =>
                  setProfile((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>

            <button
              type="button"
              onClick={update}
              className="w-full md:w-[50%] mt-4 p-2 bg-green-600 mx-auto 
              text-lg text-gray-100 font-bold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ProfileModal
        show={showImageModal}
        setModal={setImageModal}
        title="Profile Avatar Edit"
      />
    </div>
  );
};

export default Profile;
