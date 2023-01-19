import React, { useState } from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type BookLoanListProps = {};

const BookLoanList = (props: BookLoanListProps) => {
  const [show, setShow] = useState("hidden");

  const clickCollapse = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  return (
    <tr className=" items-center ">
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <span className="ml-3 font-bold text-gray-600">Name</span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        email
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        status
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex">
          <img
            src={"https://via.placeholder.com/15"}
            alt="..."
            className="w-24 h-24 rounded-full border-2 border-gray-50 shadow"
          ></img>
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex items-center">'july 1</div>
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
              clickCollapse();
            }}
          >
            View
          </span>
          <span
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
            }
            onClick={(e) => {
              clickCollapse();
            }}
          >
            Edit
          </span>

          <span
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
            }
            onClick={(e) => e.preventDefault()}
          >
            Activate/Deactivate
          </span>
        </div>
      </td>
    </tr>
  );
};

export default BookLoanList;
