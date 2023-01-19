import React, { useState } from "react";
import { faSave, faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookDetails from "../../components/BookDetails";
import UserDetails from "../../components/UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import {
  SET_LOAN_ERRORS,
  SET_LOAN_SUCCESS,
  SET_BOOK_SELECTED,
  SET_MEMBER_SELECTED,
} from "../../stores/borroweds/loanSlice";
import { makeBorrowedBook } from "../../stores/borroweds/loanActions";
import ErrorHooksNotif from "../../helper/hooks/ErrorHooksNotif";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { Book } from "../../models/Book";
import { User } from "../../models/User";
import { Role } from "../../models/Role";

type AddLoanProps = {};

export interface LoanBookInterface {
  book: Book;
  user: User<Role>;
  due_date: string;
}

const AddLoan = (props: AddLoanProps) => {
  const dispatch = useAppDispatch();
  const [DetailComp, setDetailComp] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const {
    bookSelected,
    memebrSelected,
    error: loanError,
    errors: loanErrors,
    success: loanSuccess,
    loading: loanLoading,
  } = useAppSelector((state) => state.loan);

  const submitLoanBook = async () => {
    const datas: LoanBookInterface = {
      book: bookSelected as Book,
      user: memebrSelected as User<Role>,
      due_date: returnDate,
    };
    dispatch(makeBorrowedBook(datas));
  };

  const resetForm = () => {
    setReturnDate("");
    dispatch(SET_BOOK_SELECTED(null));
    dispatch(SET_MEMBER_SELECTED(null));
  };

  const settingDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(e.target.value);
    let d1 = Date.now();
    let d2 = Date.parse(e.target.value);
    if (d1 > d2) {
      toast.error(`Invalid Return Date. Date OverDue`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setReturnDate("");
    }
  };

  ErrorHooksNotif(
    loanErrors,
    loanError,
    loanSuccess,
    SET_LOAN_ERRORS,
    SET_LOAN_SUCCESS,
    resetForm
  );

  // return spinner
  if (loanLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col p-6 pt-8 space-y-6 w-8/12">
          <h1 className="text-4xl font-semibold font-serif">New Book Loan</h1>
          <div className="flex space-x-3 items-center justify-end">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Book
            </label>
            <input
              type="text"
              className="w-[450px] px-4 py-4 rounded-lg"
              readOnly
              value={bookSelected?.title ? bookSelected.title : ""}
              onFocus={() => setDetailComp("book")}
            />
          </div>
          <div className="flex space-x-3 items-center justify-end">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Member
            </label>
            <input
              type="text"
              className="w-[450px] px-4 py-4 rounded-lg"
              readOnly
              value={
                memebrSelected
                  ? memebrSelected.firstname + " " + memebrSelected.lastname
                  : ""
              }
              onFocus={() => setDetailComp("member")}
            />
          </div>
          <div className="flex space-x-3 items-center justify-end">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Return Date
            </label>
            <input
              type="datetime-local"
              value={returnDate}
              onChange={(e) => settingDueDate(e)}
              name="return_date"
              className="w-[450px] px-4 py-4 rounded-lg"
            />
          </div>
          <div className="flex space-x-3 justify-center">
            <button
              type="button"
              onClick={submitLoanBook}
              className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
            >
              <FontAwesomeIcon icon={faSave} /> Submit
            </button>
            <button className="p-2 py-2 px-6 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-400">
              <FontAwesomeIcon icon={faTurnDown} />
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-col p-6 pt-8 space-y-6 w-2/6">
          {DetailComp === "book" ? (
            <BookDetails />
          ) : DetailComp === "member" ? (
            <UserDetails />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AddLoan;
