import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
import { useRef } from "react";
import { getLoanEdit, LoanUpdating } from "../../stores/borroweds/loanActions";
import Spinner from "../../components/Spinner";
import moment from "moment";
import { returnErrorNotif } from "../../helper/ToastMotification";
import {
  SET_LOAN_ERRORS,
  SET_LOAN_SUCCESS,
} from "../../stores/borroweds/loanSlice";
import ErrorHooksNotif from "../../helper/hooks/ErrorHooksNotif";
import { faSave, faTurnDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../stores/store";

type Props = {};

const EditLoan = (props: Props) => {
  const { id_loan } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shoudlRun = useRef(true);
  const currentDateTime = new Date();
  // let date: string = currentDateTime.toISOString('en-US', { timeZone: 'Asia/Manila' });
  let date: string = currentDateTime.toISOString();
  const {
    loan,
    loading: loanLoading,
    error: loanError,
    errors: loanErrors,
    success: loanSuccess,
  } = useAppSelector((state) => state.loan);

  const updatingLoan = () => {
    if (!id_loan || !loan) {
      returnErrorNotif(
        "Cannot Proceed in Updating Loan. Loan Details Incomplete.!"
      );
      return false;
    }
    const datas = {
      ...loan,
    };
    dispatch(LoanUpdating(id_loan, datas));
  };

  useEffect(() => {
    const fetchLoan = () => {
      if (shoudlRun.current) {
        shoudlRun.current = false;
        dispatch(getLoanEdit(id_loan!));
      }
    };
    fetchLoan();
  }, [dispatch, id_loan]);

  const reloadPage = (): void => {
    window.location.reload();
  };

  ErrorHooksNotif(
    loanErrors,
    loanError,
    loanSuccess,
    SET_LOAN_ERRORS,
    SET_LOAN_SUCCESS,
    reloadPage
  );

  // return spinner
  if (loanLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col p-6 space-y-4 w-[50%]">
        <h1 className="text-4xl font-semibold font-serif">Edit Book Loan</h1>
        <div className="flex space-x-3 items-center justify-end mt-6">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Book Title
          </label>
          <input
            type="text"
            className="w-[450px] px-4 py-4 rounded-lg"
            readOnly
            value={typeof loan?.book !== "string" ? loan?.book?.title : ""}
          />
        </div>
        <div className="flex space-x-3 items-center justify-end mt-6">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Book ISBN
          </label>
          <input
            type="text"
            className="w-[450px] px-4 py-4 rounded-lg"
            readOnly
            value={typeof loan?.book !== "string" ? loan?.book?.isbn : ""}
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
              typeof loan?.user !== "string"
                ? `${loan?.user.firstname} ${loan?.user.middlename}. ${loan?.user.lastname}`
                : ""
            }
          />
        </div>
        <div className="flex space-x-3 items-center justify-between">
          <label htmlFor="" className="text-xl font-semibold font-serif ml-36">
            Book Image
          </label>
          <img
            src={
              typeof loan?.book !== "string"
                ? (loan?.book?.image as string)
                : ""
            }
            className="w-18 h-28"
            alt=""
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label
            htmlFor=""
            className="text-xl font-semibold font-serif justify-between"
          >
            Due Date:{" "}
            {loan?.due_date
              ? moment(loan.due_date).format("MMMM Do YYYY, h:mm:ss a")
              : ""}
          </label>
          {/* <input type="datetime-local"  name='return_date' className='w-[450px] px-4 py-4 rounded-lg' 
                     value={loan?.due_date ?? ''} /> */}
        </div>

        {loan?.return_date ? (
          <div className="flex space-x-3 items-center justify-end">
            <label
              htmlFor=""
              className="text-xl font-semibold font-serif justify-between"
            >
              Return Date:{" "}
              {moment(loan.return_date).format("MMMM Do YYYY, h:mm:ss a")}
            </label>
          </div>
        ) : null}
        <div className="flex space-x-3 items-center justify-end">
          {loan?.due_date ? (
            moment(loan.due_date).isAfter(date) ? (
              <p className="text-green-700">
                Thank you for attempt returning book on time
              </p>
            ) : (
              <p className="text-red-700">
                You are failed to return this book on time. you earn a warning
                in your account
              </p>
            )
          ) : (
            ""
          )}
        </div>

        <div className="flex space-x-3 justify-end">
          {!loan?.return_date ? (
            <button
              type="button"
              onClick={updatingLoan}
              className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
            >
              <FontAwesomeIcon icon={faSave} /> Update to Return Book
            </button>
          ) : null}

          <button
            type="button"
            onClick={(e) => {
              navigate(-1);
            }}
            className="p-2 py-2 px-6 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-400"
          >
            <FontAwesomeIcon icon={faTurnDown} /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLoan;
