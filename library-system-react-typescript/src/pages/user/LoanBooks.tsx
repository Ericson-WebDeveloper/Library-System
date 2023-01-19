import React, { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  returnErrorNotif,
  returnPageNumber,
} from "../../helper/ToastMotification";
import { LoanListUserRequest } from "../../stores/borroweds/loanActions";
import Spinner from "../../components/Spinner";
import UserLoanLists from "../../components/UserLoanLists";
import Pagination from "react-js-pagination";
import { SET_LOAN_ERRORS } from "../../stores/borroweds/loanSlice";
import { useAppDispatch, useAppSelector } from "../../stores/store";

type LoanBooksProps = {};

const LoanBooks = (props: LoanBooksProps) => {
  const dispatch = useAppDispatch();
  const { auth_user } = useAppSelector((state) => state.user);
  const {
    userLoans,
    loading: loanLoading,
    error: loanError,
  } = useAppSelector((state) => state.loan);
  const shouldRun = useRef(true);
  const [page, setPage] = useSearchParams();

  const returnPage = useMemo(() => {
    return returnPageNumber(page);
  }, [page]);

  useEffect(() => {
    const fetchUserLoans = () => {
      if (shouldRun.current) {
        shouldRun.current = false;
        dispatch(LoanListUserRequest(returnPage, auth_user!._id));
      }
    };
    fetchUserLoans();
  }, [dispatch, returnPage, auth_user]);

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
      <div className="flex flex-col space-y-8 p-6">
        <h1 className="text-4xl font-serif font-bold">My Book Loan(s)</h1>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <UserLoanLists datas={userLoans} />
        </div>
        {/* pagination */}
        {
          // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
          userLoans && userLoans?.data?.length > 0 && (
            <div className="flex justify-start mt-5">
              <Pagination
                // style={{ display: 'flex' }}
                activePage={userLoans?.currePage}
                totalItemsCount={userLoans?.totalDatas}
                itemsCountPerPage={userLoans?.rowsPerPage}
                onChange={async (pageNumber) => {
                  if (pageNumber !== Number(returnPage)) {
                    setPage({ page: String(pageNumber) });
                    dispatch(LoanListUserRequest(pageNumber, auth_user!._id));
                  }
                }}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default LoanBooks;
