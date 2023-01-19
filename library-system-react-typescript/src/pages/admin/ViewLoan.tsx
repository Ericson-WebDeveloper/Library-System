import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
// import { useDispatch, useSelector} from 'react-redux'
import { useParams, useNavigate } from "react-router-dom";
import { getLoanEdit } from "../../stores/borroweds/loanActions";
import Spinner from "../../components/Spinner";
import moment from "moment";
import { returnErrorNotif } from "../../helper/ToastMotification";
import { SET_LOAN_ERRORS } from "../../stores/borroweds/loanSlice";
import { useAppDispatch, useAppSelector } from "../../stores/store";

type ViewLoanProps = {};

const ViewLoan = (props: ViewLoanProps) => {
  const dispatch = useAppDispatch();
  const { id_loan } = useParams();
  const shouldRun = useRef(true);
  const navigate = useNavigate();
  const {
    loan,
    loading: loanLoading,
    error: loanError,
  } = useAppSelector((state) => state.loan);

  useEffect(() => {
    const fetchLoan = () => {
      if (shouldRun.current) {
        shouldRun.current = false;
        dispatch(getLoanEdit(id_loan!));
      }
    };
    fetchLoan();
  }, [dispatch, id_loan]);

  const getMinDiff = (startDate: any, endDate: any) => {
    // const msInMinute = 60 * 1000;

    // startDate = new Date(startDate);
    // endDate = new Date(endDate)
    console.log(startDate, endDate);
    // return Math.round(
    //   Math.abs(endDate.getTime() - startDate.getTime()) / msInMinute
    // );
    var diff = Math.abs(endDate - startDate);
    // console.log(diff)
    return Math.floor(diff / 1000 / 60);
  };

  useEffect(() => {
    if (loanError) {
      let errorMsg = loanError;
      dispatch(SET_LOAN_ERRORS({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }
  }, [dispatch, loanError]);

  // return spinner
  if (loanLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <h1 className="text-4xl font-semibold font-serif text-center pt-6">
        Book Loan Details
      </h1>
      <div className="flex flex-col xl:flex-row p-6 space-x-3 space-y-4 lg:space-y-0">
        <div className="h-full w-[100%] lg:w-[50%] space-y-5">
          <div className="flex w-full space-x-3  items-center justify-between">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Book Title
            </label>
            <input
              type="text"
              className="w-[350px] px-4 py-4 rounded-lg"
              readOnly
              value={typeof loan?.book !== "string" ? loan?.book?.title : ""}
            />
          </div>
          <div className="flex space-x-3 items-center  justify-between">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Book ISBN
            </label>
            <input
              type="text"
              className="w-[350px] px-4 py-4 rounded-lg"
              readOnly
              value={typeof loan?.book !== "string" ? loan?.book?.isbn : ""}
            />
          </div>
          <div className="flex space-x-3 items-center  justify-between">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Book Author
            </label>
            <input
              type="text"
              className="w-[350px] px-4 py-4 rounded-lg"
              readOnly
              value={typeof loan?.book !== "string" ? loan?.book?.author : ""}
            />
          </div>
          <div className="flex space-x-3 items-center justify-between">
            <label htmlFor="" className="text-xl font-semibold font-serif">
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
        </div>

        <div className="w-full lg:w-[50%] h-full space-y-5">
          <div className="flex space-x-3 items-center justify-between">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Member
            </label>
            <input
              type="text"
              className="w-[350px] px-4 py-4 rounded-lg"
              readOnly
              value={
                typeof loan?.user !== "string"
                  ? `${loan?.user?.firstname} ${loan?.user?.middlename}. ${loan?.user?.lastname}`
                  : ""
              }
            />
          </div>
          <div className="flex space-x-3 items-center justify-between">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Borrwed Date
            </label>
            <input
              type="text"
              className="w-[350px] px-4 py-4 rounded-lg"
              readOnly
              value={moment(loan?.issue_date).format("MMMM Do YYYY, h:mm:ss a")}
            />
          </div>
          <div className="flex space-x-3 items-center justify-between">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Due Date
            </label>
            <input
              type="text"
              className="w-[350px] px-4 py-4 rounded-lg"
              readOnly
              value={moment(loan?.due_date).format("MMMM Do YYYY, h:mm:ss a")}
            />
          </div>
          <div className="flex space-x-3 items-center justify-between ">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              Return Date
            </label>
            <input
              type="text"
              className="w-[350px] px-4 py-4 rounded-lg"
              readOnly
              value={
                loan?.return_date
                  ? moment(loan?.return_date).format("MMMM Do YYYY, h:mm:ss a")
                  : ""
              }
            />
          </div>
          {getMinDiff(
            moment(loan?.return_date).format("DD/MM/YYYY hh:mm:ss"),
            moment(loan?.due_date).format("DD/MM/YYYY hh:mm:ss")
          )}

          <div className="flex space-x-3 items-center justify-between">
            <label htmlFor="" className="text-xl font-semibold font-serif">
              User Image
            </label>
            <img
              src={
                typeof loan?.user !== "string"
                  ? (loan?.user?.details?.avatar as string)
                  : ""
              }
              className="w-18 h-28"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end ">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 py-2 px-6  mr-8 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-400"
        >
          <FontAwesomeIcon icon={faBackward} /> Back
        </button>
      </div>
    </div>
  );
};

export default ViewLoan;
