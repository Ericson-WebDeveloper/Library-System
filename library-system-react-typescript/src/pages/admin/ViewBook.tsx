import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import {
  returnErrorNotif,
  returnErrorsNotif,
  returnSuccessNotif,
} from "../../helper/ToastMotification";
import { getBook } from "../../stores/book/BookAction";
import { SET_BOOK_ERRORS, SET_BOOK_SUCCESS } from "../../stores/book/BookSlice";
import { useAppDispatch, useAppSelector } from "../../stores/store";

type ViewBookProps = {};

const ViewBook = (props: ViewBookProps) => {
  const dispatch = useAppDispatch();
  const {
    error: bookError,
    errors: bookErrors,
    success: bookSuccess,
    bookLoading,
    book,
  } = useAppSelector((state) => state.book);
  const { id_book } = useParams();
  const shouldRun = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = () => {
      if (shouldRun.current) {
        shouldRun.current = false;
        dispatch(getBook(id_book!));
      }
    };
    fetchBook();
  }, [dispatch, id_book, book]);

  useEffect(() => {
    if (bookError) {
      let errorMsg = bookError;
      dispatch(SET_BOOK_ERRORS({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }

    if (bookErrors) {
      let errors = bookErrors;
      dispatch(SET_BOOK_ERRORS({ error: null, errors: null }));
      returnErrorsNotif(errors);
    }

    if (bookSuccess) {
      let successMessage = bookSuccess;
      dispatch(SET_BOOK_SUCCESS(null));
      returnSuccessNotif(successMessage);
    }
  }, [dispatch, bookError, bookSuccess, bookErrors]);

  if (bookLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col p-6 pt-8 space-y-6 w-8/12">
        <h1 className="text-4xl font-semibold font-serif">Book Detail's</h1>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={book?.isbn}
            readOnly
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={book?.title}
            readOnly
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Author
          </label>
          <input
            type="text"
            name="author"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={book?.author}
            readOnly
          />
        </div>

        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Image
          </label>
          <img src={book?.image as string} alt="" className="h-36 w-[70%] " />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Copies
          </label>
          <input
            type="number"
            className="w-[450px] px-4 py-4 rounded-lg text-center"
            value={book?.copies as number}
            readOnly
          />
        </div>
        <div className="flex space-x-3 justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 py-2 px-6  bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-400"
          >
            <FontAwesomeIcon icon={faBackward} /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
