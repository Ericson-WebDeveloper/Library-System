import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import DashBoard1 from "../../components/DashBoard";
import Spinner from "../../components/Spinner";
import {
  errorUser,
  errorusers,
  SET_USER_ERROR,
  usercounts,
  userlibrarianscount,
  userloading,
} from "../../stores/user/UserSlice";
import { adminDashBoardDatas } from "../../stores/user/UserActions";
import { GetBooksDashData } from "../../stores/book/BookAction";
import {
  returnErrorNotif,
  returnErrorsNotif,
} from "../../helper/ToastMotification";
import { SET_BOOK_ERRORS } from "../../stores/book/BookSlice";
import { GetLoanDashData } from "../../stores/borroweds/loanActions";
import { SET_LOAN_ERRORS } from "../../stores/borroweds/loanSlice";
import { useAppDispatch, useAppSelector } from "../../stores/store";

type DashBoardProps = {};

const DashBoard = (props: DashBoardProps) => {
  const dispatch = useAppDispatch();
  const shoudlRun = useRef(true);
  const userError = useSelector(errorUser);
  const userErrors = useSelector(errorusers);
  const users_count = useSelector(usercounts);
  const librarian_count = useSelector(userlibrarianscount);
  // const books_count = useSelector(userbookscount);
  // const book_available = 0;
  // const book_unavailable = 0;
  // const loans_count = useSelector(userloancount);
  const user_loading = useSelector(userloading);

  const {
    error: bookError,
    errors: bookErrors,
    bookLoading,
    booksCount,
    booksCount2,
    booksCount3,
  } = useAppSelector((state) => state.book);
  const {
    loading: loanLoading,
    error: loanError,
    errors: loanErrors,
    loanCount,
    loanCount2,
    loanCount3,
  } = useAppSelector((state) => state.loan);

  useEffect(() => {
    const fetchDatas = () => {
      if (shoudlRun.current) {
        shoudlRun.current = false;
        dispatch(adminDashBoardDatas());
        dispatch(GetBooksDashData());
        dispatch(GetLoanDashData());
      }
    };

    fetchDatas();
  }, [dispatch]);

  useEffect(() => {
    if (userError) {
      let errorMsg = userError;
      dispatch(SET_USER_ERROR({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }

    if (userErrors) {
      let errors = userErrors;
      dispatch(SET_USER_ERROR({ error: null, errors: null }));
      returnErrorsNotif(errors);
    }

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
  }, [
    dispatch,
    userError,
    userErrors,
    bookError,
    bookErrors,
    loanErrors,
    loanError,
  ]);

  if (user_loading || bookLoading || loanLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 space-x-4 space-y-4">
          <div className="" style={{ height: "400px" }}>
            <DashBoard1
              counts={[users_count, librarian_count]}
              labels={["user", "librarian"]}
            />
          </div>
          <div className="" style={{ height: "400px" }}>
            <DashBoard1
              counts={[booksCount, booksCount2, booksCount3]}
              labels={["books", "available", "unavailable"]}
            />
          </div>
          <div className="" style={{ height: "400px" }}>
            <DashBoard1
              counts={[loanCount, loanCount2, loanCount3]}
              labels={["borrowed ", "return", "to return"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
