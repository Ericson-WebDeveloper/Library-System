import React from "react";
import { useState } from "react";
import { bookSearch } from "../stores/book/BookAction";
import { expiredTokenError } from "../helper/ErrorHandler";
import { SET_BOOK_SELECTED } from "../stores/borroweds/loanSlice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../stores/store";
import { Book } from "../models/Book";

type BookDetailsProps = {};

const BookDetails = (props: BookDetailsProps) => {
  const dispatch = useAppDispatch();
  const [showList, setHowList] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  // const [member, setMember] = useState(null);
  const [books, setBooks] = useState<Book[] | null>(null);
  const [searchBook, setSearchBook] = useState("");

  const search = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchBook !== "") {
      // setTimeout(async () => {
      try {
        let { data } = await bookSearch(searchBook);
        setBooks(data.books);
        data?.books?.length > 0 ? setHowList(true) : setHowList(false);
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

  const setBookForLoan = () => {
    if (!book) {
      toast.error(`Book Not Selected Properly.`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
    dispatch(SET_BOOK_SELECTED(book));
    setBook(null);
    setHowList(false);
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <h1 className="text-4xl font-semibold font-serif">Book Details</h1>
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
            name="searchBook"
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
            onKeyPress={(e) => search(e)}
            placeholder="Search book ex: title, Author, isbn"
            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          />
        </div>

        <ul
          className={`w-full bg-white bottom-0 max-h-64 mt[3px] rounded-tr-xl rounded-tl-xl rounded-br-xl rounded-bl-xl overflow-y-auto 
            ${showList ? "block" : "hidden"}`}
        >
          {books?.map((book, index) => {
            return (
              <li
                key={index}
                className="border-2 py-3 pl-2 pr-4 cursor-pointer hover:border-gray-300 
                        hover:bg-gray-400"
                onClick={() => {
                  setBook(book);
                  setHowList(false);
                }}
              >
                {book.title}
              </li>
            );
          })}
        </ul>
      </span>

      {book ? (
        <>
          <div className="flex flex-col justify-start">
            <label className="text-xl font-serif">
              Book Title: {book.title}
            </label>
            <label className="text-xl font-serif">Book ISBN: {book.isbn}</label>
            <label className="text-xl font-serif">
              Book Author: {book.author}
            </label>
            <label className="text-xl font-serif">{`Book Copies Available: ${book.copies}`}</label>
            <label className="text-xl font-serif">Book Image:</label>
            <img src={book.image as string} alt="" />
          </div>
          {book?.copies > 0 ? (
            <button
              type="button"
              onClick={setBookForLoan}
              className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
            >
              Select
            </button>
          ) : (
            <p>not available {}</p>
          )}
        </>
      ) : null}
    </div>
  );
};

export default BookDetails;
