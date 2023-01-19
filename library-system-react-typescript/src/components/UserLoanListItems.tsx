import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Loan } from "../models/Loan";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { Book } from "../models/Book";

type UserLoanListItemsProps = {
  data: Loan<User<Role>, Book>;
};

const UserLoanListItems = ({ data }: UserLoanListItemsProps) => {
  const [show, setShow] = useState("hidden");
  const navigate = useNavigate();
  const clickCollapse = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  return (
    <tr
      className={`items-center ${
        data?.status === "return" ? "text-green-500" : "text-red-500"
      }`}
    >
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <span className="ml-3 font-bold text-gray-600">
          {typeof data?.book === "string" ? data?.book : data?.book?.title}
        </span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        {typeof data?.book === "string" ? data?.book : data?.book?.isbn}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex">
          <img
            src={
              typeof data?.book === "string"
                ? "https://via.placeholder.com/15"
                : String(data?.book?.image)
            }
            alt="..."
            className="w-24 h-24 rounded-full border-2 border-gray-50 shadow"
          />
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        {data?.issue_date &&
          moment(data.issue_date).format("MMMM Do YYYY, h:mm:ss a")}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex items-center">
          {data?.due_date &&
            moment(data.due_date).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex items-center">
          {data?.return_date
            ? moment(data.return_date).format("MMMM Do YYYY, h:mm:ss a")
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
              navigate(`/library-system/loan/view/${data._id}`);
              clickCollapse();
            }}
          >
            View
          </span>
          {data?.status === "not return" && (
            <span
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
              }
              onClick={(e) => {
                navigate(`/library-system/admin/loan/edit/${data._id}`);
                clickCollapse();
              }}
            >
              Edit
            </span>
          )}

          {/* <span
                    className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "}
                    onClick={(e) => e.preventDefault()}>
                    Activate/Deactivate
                </span> */}
        </div>
      </td>
    </tr>
  );
};

export default UserLoanListItems;
