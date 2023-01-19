import React, { useState } from "react";
import { expiredTokenError } from "../helper/ErrorHandler";
import { toast } from "react-toastify";
import { userSearch } from "../stores/user/UserActions";
// import { useDispatch } from 'react-redux';
import { SET_MEMBER_SELECTED } from "../stores/borroweds/loanSlice";
import { useAppDispatch } from "../stores/store";
import { User } from "../models/User";
import { Role } from "../models/Role";

type UserDetailsProps = {};

const UserDetails = (props: UserDetailsProps) => {
  const dispatch = useAppDispatch();
  // const [member, setMember] = useState(null);
  const [showList, setHowList] = useState<boolean>(false);
  const [user, setUser] = useState<User<Role> | null>(null);
  const [users, setUsers] = useState<User<Role>[] | null>(null);
  const [searchUser, setSearchUser] = useState<string>("");

  const search = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchUser !== "") {
      // setTimeout(async () => {
      try {
        setUser(null);
        let { data } = await userSearch(searchUser);
        setUsers(data.users);
        data?.users?.length > 0 ? setHowList(true) : setHowList(false);
      } catch (error: any) {
        if (error.response.status === 403) {
          expiredTokenError(error, dispatch);
          return false;
        }
        toast.error(`Server Error. Cannot Serach Book`, {
          theme: "dark",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
      // }, 3000);
    }
  };

  const setUserForLoan = () => {
    if (!user) {
      toast.error(`Book Not Selected Properly.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
    dispatch(SET_MEMBER_SELECTED(user));
    setUsers(null);
    setHowList(false);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <h1 className="text-4xl font-semibold font-serif">User Details</h1>
      {/* like search in google */}
      <span className="flex flex-col space-y-1">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="searchUser"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            onKeyPress={(e) => search(e)}
            placeholder="Search book ex: title, Author, isbn"
            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          />
        </div>

        <ul
          className={`w-full bg-white bottom-0 max-h-64 mt[3px] rounded-tr-xl rounded-tl-xl rounded-br-xl rounded-bl-xl overflow-y-auto 
              ${showList ? "block" : "hidden"}`}
        >
          {users?.map((user, index) => {
            return (
              <li
                key={index}
                className="border-2 py-3 pl-2 pr-4 cursor-pointer hover:border-gray-300 
                          hover:bg-gray-400"
                onClick={() => {
                  setUser(user);
                  setHowList(false);
                }}
              >{`${user.firstname} ${user.lastname}`}</li>
            );
          })}
        </ul>
      </span>

      {/* Details */}
      {user ? (
        <>
          <div className="flex flex-col justify-start">
            <label htmlFor="" className="text-xl font-serif">
              User Full Name:{" "}
              {`${user?.firstname} ${user?.middlename}. ${user?.lastname} `}
            </label>
            <label htmlFor="" className="text-xl font-serif">
              User Email: {user?.email}
            </label>
            <label htmlFor="" className="text-xl font-serif">
              User Phone: {user?.details?.phone}
            </label>
            <label htmlFor="" className="text-xl font-serif">
              User Image:
            </label>
            <img src={user?.details?.avatar as string} alt="" />
          </div>
          <button
            type="button"
            onClick={setUserForLoan}
            className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
          >
            Select
          </button>
        </>
      ) : null}
    </div>
  );
};

export default UserDetails;
