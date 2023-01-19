import React, { useRef } from "react";
import { useState } from "react";
import { imageToBas64 } from "../helper/ImageHelper";
import { updatingProfileUserAvatar } from "../stores/user/UserActions"; // updatingProfileUser,
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from "../stores/store";

type ProfileModalProps = {
  show: string;
  setModal: React.Dispatch<React.SetStateAction<string>>;
  title: string;
};

const ProfileModal = ({ show, setModal, title }: ProfileModalProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [profielImage, SetProfielImage] = useState({
    avatar: "",
  });

  const { avatar } = profielImage;

  const onImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageToBas64(e.target, (image) => {
      SetProfielImage((prev) => ({
        ...prev,
        avatar: image ? String(image) : "",
      }));
    });
  };

  const submitProfileAvatar = () => {
    const datas = {
      avatar: profielImage.avatar,
    };
    dispatch(updatingProfileUserAvatar(datas));
    setTimeout(() => {
      SetProfielImage((prev) => ({ ...prev, avatar: "" }));
      window.location.reload();
    }, 1000);
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${!show ? "hidden" : show} 
    fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full transition delay-150 duration-300 ease-in-out`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title ? title : "Modal Form"}
            </h3>
            <button
              onClick={() => setModal("")}
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
          <div className="p-6 flex flex-col space-y-1">
            <label htmlFor="" className="text-2xl text-white ">
              Image
            </label>
            <input
              type="file"
              onChange={(e) => onImageCapture(e)}
              name="avatar"
              id="avatar"
              className="rounded-lg text-white border-[1px] border-gray-200 p-2"
              ref={imageRef}
            />
            {avatar ? (
              <span className="flex justify-center items-center">
                <img src={avatar} className="h-72 w-[60%] text-center" alt="" />
              </span>
            ) : null}
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={submitProfileAvatar}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                        dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <button
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none 
                        focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 
                        dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={() => setModal("")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
