import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from 'react-redux';
import { SendEmailLoan } from "../stores/borroweds/loanActions";
import { Loan } from "../models/Loan";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { Book } from "../models/Book";
import { useAppDispatch } from "../stores/store";

type LoansListItemsProps = {
  loan: Loan<User<Role>, Book>;
};

const LoansListItems = ({ loan }: LoansListItemsProps) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState("hidden");
  const navigate = useNavigate();
  const clickCollapse = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  const sendEmail = () => {
    if (loan?._id) {
      dispatch(SendEmailLoan(loan._id));
    }
    setShow("hidden");
  };
  return (
    <tr
      className={`items-center ${
        loan?.status === "return" ? "text-green-500" : "text-red-500"
      }`}
    >
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <input type="checkbox" name="" id="" />
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <span className="flex flex-col items-center ml-3 font-bold text-gray-600">
          {/* {loan?.book?.title} */}
          {typeof loan?.book === "string" ? loan?.book : loan?.book?.title}
          <img
            src={
              typeof loan?.book === "string" ? "" : String(loan?.book?.image)
            }
            alt="..."
            className="w-26 h-14 rounded-full border-2 border-gray-50 shadow"
          ></img>
        </span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        {typeof loan?.user === "string"
          ? " "
          : loan?.user?.firstname + " " + loan?.user?.lastname}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        {loan?.status}
      </td>

      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex items-center">
          {loan?.issue_date &&
            moment(loan.issue_date).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex items-center">
          {loan?.due_date &&
            moment(loan.due_date).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex items-center">
          {loan?.return_date &&
            moment(loan.return_date).format("MMMM Do YYYY, h:mm:ss a")}
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
              navigate(`/library-system/loan/view/${loan._id}`);
              clickCollapse();
            }}
          >
            View
          </span>
          {loan?.status === "not return" && (
            <>
              <span
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
                }
                onClick={(e) => {
                  navigate(`/library-system/admin/loan/edit/${loan._id}`);
                  clickCollapse();
                }}
              >
                Edit
              </span>
              <span
                className={`text-sm py-2 px-4 font-normal block w-full whitespace-nowrap 
                    bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100`}
                onClick={(e) => {
                  sendEmail();
                  e.preventDefault();
                }}
              >
                Send Mail
              </span>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default LoansListItems;
