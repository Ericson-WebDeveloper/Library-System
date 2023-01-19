import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { resetWarningUser } from "../stores/user/UserActions";
import { useAppDispatch } from "../stores/store";
import { User } from "../models/User";
import { Role } from "../models/Role";

type UsersListItemsProps = {
  user: User<Role>;
};

const UsersListItems = ({ user }: UsersListItemsProps) => {
  const [show, setShow] = useState("hidden");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickCollapse = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  const resetWarningRequest = () => {
    dispatch(resetWarningUser(user._id));
  };
  return (
    <tr className=" items-center ">
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <span className="ml-3 font-bold text-gray-600">
          {user?.firstname + " " + user?.lastname}
        </span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        {user?.email}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        {user?.warning && user.warning >= 3 ? (
          <span className="p-2 rounded-lg bg-red-700 text-white">Blocked</span>
        ) : (
          <span className="p-2 rounded-lg bg-green-700 text-white">Normal</span>
        )}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex">
          <img
            src={
              user?.details?.avatar
                ? (user.details.avatar as string)
                : "https://via.placeholder.com/15"
            }
            alt="..."
            className="w-24 h-24 rounded-full border-2 border-gray-50 shadow"
          ></img>
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex items-center">
          {user?.created_at
            ? moment(user.created_at).format("MMMM Do YYYY, h:mm:ss a")
            : ""}
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center">
        <span
          className="text-gray-500 py-1 px-3 cursor-pointer"
          onClick={clickCollapse}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} onClick={clickCollapse} />
        </span>
        <div
          className={
            "bg-white absolute text-base mr-10 right-0.5 list-none text-left rounded shadow-lg w-60 " +
            show
          }
        >
          <span
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
            }
            onClick={() => {
              navigate(`/library-system/admin/user/view/${user._id}`);
              clickCollapse();
            }}
          >
            View
          </span>
          {/* <span
                className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "}
                onClick={(e) => { clickCollapse(); }}>
                Edit
            </span> */}
          {user.warning && user.warning >= 3 ? (
            <span
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
              }
              onClick={(e) => {
                e.preventDefault();
                resetWarningRequest();
              }}
            >
              Reset Warning
            </span>
          ) : null}
        </div>
      </td>
    </tr>
  );
};

export default UsersListItems;
