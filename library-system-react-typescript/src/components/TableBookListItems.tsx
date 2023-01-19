import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { RemovingBook } from "../stores/book/BookAction";
import { isAllowed } from "../middleware/CheckRole";
import { useAppDispatch, useAppSelector } from "../stores/store";
import { Book } from "../models/Book";
import { Role } from "../models/Role";

type TableBookListItemsProps = {
  book: Book;
};

const TableBookListItems = ({ book }: TableBookListItemsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState("hidden");
  const { auth_user } = useAppSelector((state) => state.user);

  const clickCollapse = () => {
    show === "hidden" ? setShow("") : setShow("hidden");
  };

  const removingBook = (id: string) => {
    dispatch(RemovingBook(id));
  };
  return (
    <tr className=" items-center ">
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <span className="ml-3 font-bold text-gray-600">{book.title}</span>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        {book.isbn}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        {book.author}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex">
          <img
            src={
              book?.image
                ? (book.image as string)
                : "https://via.placeholder.com/15"
            }
            alt="..."
            className="w-24 h-24 rounded-full border-2 border-gray-50 shadow"
          ></img>
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-lg">
        <div className="flex items-center">
          <span
            className={`p-2 ${
              book.status === "available" ? "text-green-500" : "text-red-500"
            } bg-gray-200 rounded-lg`}
          >
            {book.status}
          </span>
        </div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-center">
        {isAllowed(auth_user?.role as Role[], "Librarian") ? (
          <>
            <span
              className="text-gray-500 py-1 px-3 cursor-pointer"
              onClick={clickCollapse}
            >
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                onClick={clickCollapse}
              />
            </span>
            <div
              className={
                "bg-white absolute text-base mr-10 right-0.5 list-none text-left rounded shadow-lg w-60 " +
                show
              }
            >
              {/* user role only view visible, middleware in backend also */}
              <span
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
                }
                onClick={() => {
                  navigate(`/library-system/view/book/${book._id}`);
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
                  navigate(`/library-system/admin/book/edit/${book._id}`);
                  clickCollapse();
                }}
              >
                Edit
              </span>
              <span
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:cursor-pointer hover:bg-gray-100 "
                }
                onClick={(e) => {
                  removingBook(book._id);
                  e.preventDefault();
                }}
              >
                Delete
              </span>
            </div>
          </>
        ) : null}
      </td>
    </tr>
  );
};

export default TableBookListItems;
