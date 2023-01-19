import React, { useMemo, useRef } from "react";
import { useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux'
import { useParams, useSearchParams } from "react-router-dom";
import PaginationComponent from "../../components/PaginationComponent";
import Spinner from "../../components/Spinner";
import UserLoanLists from "../../components/UserLoanLists";
import {
  returnErrorNotif,
  returnPageNumber,
} from "../../helper/ToastMotification";
import { LoanListUserRequest } from "../../stores/borroweds/loanActions";
import { SET_LOAN_ERRORS } from "../../stores/borroweds/loanSlice";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { userGetById } from "../../stores/user/UserActions";
import { SET_USER_ERROR } from "../../stores/user/UserSlice";

type ViewUserProps = {};

const ViewUser = (props: ViewUserProps) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useSearchParams();
  const {
    user,
    user_loading,
    error: userError,
  } = useAppSelector((state) => state.user);
  const {
    userLoans,
    loading: loanLoading,
    error: loanError,
  } = useAppSelector((state) => state.loan);
  const { id_user } = useParams();
  const shouldRun = useRef(true);

  const returnPage = useMemo((): number => {
    return returnPageNumber(page);
  }, [page]);

  useEffect(() => {
    const fetchUserLoans = async () => {
      if (shouldRun.current) {
        shouldRun.current = false;
        await dispatch(userGetById(id_user!));
        await dispatch(LoanListUserRequest(returnPage, id_user!));
      }
    };
    fetchUserLoans();
  }, [dispatch, id_user, returnPage]);

  useEffect(() => {
    if (loanError) {
      let errorMsg = loanError;
      dispatch(SET_LOAN_ERRORS({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }
    if (userError) {
      let errorMsg = userError;
      dispatch(SET_USER_ERROR({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }
  }, [dispatch, loanError, userError]);

  // return spinner
  if (loanLoading || user_loading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col p-6 space-y-6">
        <div className="flex flex-col space-y-4">
          {/* user */}
          <h1 className="text-4xl font-semibold font-serif text-center pt-6">
            User Details
          </h1>
          <div className="w-full h-full space-y-5">
            <div className="flex flex-col md:flex-row space-x-3 items-center justify-between ">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                Member
              </label>
              <input
                type="text"
                className="w-[350px] px-4 py-4 rounded-lg"
                readOnly
                value={`${user?.firstname} ${user?.middlename}. ${user?.lastname}`}
              />
            </div>
            <div className="flex flex-col md:flex-row space-x-3 items-center justify-between">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                Email
              </label>
              <input
                type="text"
                className="w-[350px] px-4 py-4 rounded-lg"
                readOnly
                value={user?.email}
              />
            </div>
            <div className="flex flex-col md:flex-row space-x-3 items-center justify-between">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                Phone
              </label>
              <input
                type="text"
                className="w-[350px] px-4 py-4 rounded-lg"
                readOnly
                value={
                  user?.details?.phone ? (user?.details?.phone as string) : ""
                }
              />
            </div>
            <div className="flex flex-col md:flex-row space-x-3 items-center justify-between">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                User Image
              </label>
              <img
                src={(user?.details?.avatar as string) || ""}
                className="w-18 h-28"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <UserLoanLists datas={userLoans} />
        </div>
        {/* pagination */}
        {
          // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
          userLoans?.data && userLoans?.data?.length > 0 && (
            <div className="flex justify-start mt-5">
              <PaginationComponent
                activePage={userLoans?.currePage}
                totalItemsCount={userLoans?.totalDatas}
                itemsCountPerPage={userLoans?.rowsPerPage}
                page={returnPage}
                fetchHook={LoanListUserRequest}
                otherparam={id_user}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ViewUser;
