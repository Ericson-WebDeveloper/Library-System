import React, { useRef, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoanList from "../../components/LoanList";
import { LoanListRequest } from "../../stores/borroweds/loanActions";
import Spinner from "../../components/Spinner";
import "../../assets/css/paginate.css";
import {
  returnErrorNotif,
  returnErrorsNotif,
  returnPageNumber,
  returnSuccessNotif,
} from "../../helper/ToastMotification";
import {
  SET_LOAN_ERRORS,
  SET_LOAN_SUCCESS,
} from "../../stores/borroweds/loanSlice";
import PaginationComponent from "../../components/PaginationComponent";
import {
  constructQuery,
  makeQueryParams,
  urlQueryParams,
} from "../../helper/QueryParams";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import {
  faDownload,
  faPlus,
  faSearch,
  faTurnDown,
  faMailBulk,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type LoansProps = {};

const Loans = (props: LoansProps) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useSearchParams();
  const ShouldRun = useRef(true);
  const [searchForm, setSearchForm] = useState({
    book: page.get("book") ? page.get("book") : "",
    user: page.get("user") ? page.get("user") : "",
    issue_date: page.get("issue_date") ? page.get("issue_date") : "",
    due_date: page.get("due_date") ? page.get("due_date") : "",
    return_date: page.get("return_date") ? page.get("return_date") : "",
    status: page.get("status") ? page.get("status") : "all",
  });
  const { book, user, issue_date, due_date, return_date, status } = searchForm;
  const {
    loanSelecteds,
    loans,
    loading: loanLoading,
    error: loanError,
    errors: loanErrors,
    success: loanSuccess,
  } = useAppSelector((state) => state.loan);

  const searchDatas = () => {
    let querys = constructQuery(searchForm);
    setPage({ ...querys, page: String(1) });
    let search = makeQueryParams(querys);
    dispatch(LoanListRequest(1, String(search!)));
  };

  const resetFormSearch = () => {
    setSearchForm({
      book: "",
      user: "",
      issue_date: "",
      due_date: "",
      return_date: "",
      status: "all",
    });
    setPage({ page: String(returnPage) });
  };

  const returnResendEmailBtn = () => {
    return loanSelecteds ? false : true;
  };

  const returnPage = useMemo((): number => {
    return returnPageNumber(page);
  }, [page]);

  useEffect(() => {
    const fetchLoans = async () => {
      if (ShouldRun.current) {
        ShouldRun.current = false;
        let querys = urlQueryParams();
        let search = makeQueryParams(querys);
        dispatch(LoanListRequest(returnPage, search));
      }
    };
    fetchLoans();
  }, [dispatch, returnPage]);

  useEffect(() => {
    if (loanError) {
      let errorMsg = loanError;
      dispatch(SET_LOAN_ERRORS({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }

    if (loanErrors) {
      let errors = loanErrors;
      dispatch(SET_LOAN_ERRORS({ error: null, errors: null }));
      returnErrorsNotif(errors);
    }

    if (loanSuccess) {
      let successMessage = loanSuccess;
      dispatch(SET_LOAN_SUCCESS(null));
      returnSuccessNotif(successMessage);
    }
  }, [dispatch, loanError, loanSuccess, loanErrors]);

  // return spinner
  if (loanLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col space-y-8 p-6">
        <h1 className="text-4xl font-serif font-bold">Book Loan(s)</h1>

        <div className="flex space-x-2">
          <Link
            to="/library-system/admin/loans/add"
            className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
          >
            <FontAwesomeIcon icon={faPlus} /> New
          </Link>
          <button className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400">
            <FontAwesomeIcon icon={faDownload} /> Import
          </button>
          <button
            className={`p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400 ${
              returnResendEmailBtn() ? "opacity-50" : ""
            }`}
            disabled={returnResendEmailBtn()}
          >
            <FontAwesomeIcon icon={faMailBulk} /> Send Reminder via Email
          </button>
        </div>

        <div className="flex flex-col rounded-2xl border-[1px] border-black p-4 space-y-4">
          <div className="flex ">
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Book
              </label>
              <input
                type="text"
                name="book"
                className="w-[70%] p-2 rounded-lg"
                value={book as string}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Member
              </label>
              <input
                type="text"
                name="user"
                className="w-[70%] p-2 rounded-lg"
                value={user as string}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Issue Date
              </label>
              <input
                type="date"
                name="issue_date"
                className="w-[70%] p-2 rounded-lg"
                value={issue_date as string}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                className="w-[70%] p-2 rounded-lg"
                value={due_date as string}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Return Date
              </label>
              <input
                type="date"
                name="return_date"
                className="w-[70%] p-2 rounded-lg"
                value={return_date as string}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Status
              </label>
              {/* <input type="text" className='w-[70%] p-2 rounded-lg' /> */}
              <select
                name="status"
                id="status"
                className="w-[70%] p-2 rounded-lg"
                value={status as string}
                onChange={(e) =>
                  setSearchForm((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="all">Select Status</option>
                <option value="return">Return</option>
                <option value="not return">Not Return</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end items-center pr-5 space-x-6">
            <button
              type="button"
              onClick={searchDatas}
              className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
            >
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
            <button
              type="button"
              onClick={resetFormSearch}
              className="p-2 py-2 px-6 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-400"
            >
              <FontAwesomeIcon icon={faTurnDown} />
              Reset
            </button>
          </div>
        </div>

        {/* table */}

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                  bg-gray-50 text-gray-500 border-gray-100`}
                ></th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                  bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Book Title
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
                      bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Member
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Status
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                      bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Issue Date
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                      bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Due Date
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                      bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Return Date
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                      bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <LoanList datas={loans} />
            </tbody>
          </table>
        </div>
        {
          // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
          loans?.data && loans?.data?.length > 0 && (
            <div className="flex justify-start mt-5">
              <PaginationComponent
                activePage={loans?.currePage}
                totalItemsCount={loans?.totalDatas}
                itemsCountPerPage={loans?.rowsPerPage}
                page={returnPage}
                fetchHook={LoanListRequest}
                otherparam={null}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Loans;
