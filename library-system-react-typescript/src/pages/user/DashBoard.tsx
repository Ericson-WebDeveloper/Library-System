import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import DashBoard1 from "../../components/DashBoard";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { userLoanDashBoardDatas } from "../../stores/user/UserActions";

type DashBoardProps = {};

const DashBoard = (props: DashBoardProps) => {
  const dispatch = useAppDispatch();
  const shoudlRun = useRef(true);
  const { auth_user, user_loan_count } = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchDatas = async () => {
      if (shoudlRun.current) {
        shoudlRun.current = false;
        await dispatch(userLoanDashBoardDatas(auth_user!._id));
      }
    };
    fetchDatas();
  }, [dispatch, auth_user]);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 space-x-4 space-y-4">
          <div className="" style={{ height: "400px" }}>
            <DashBoard1
              counts={[user_loan_count.total, user_loan_count.current]}
              labels={["Total Loan", "Current Loan"]}
            />
          </div>
          {/* <div className='' style={{ height: '400px' }}>
              <DashBoard1 counts={[booksCount, booksCount2, booksCount3]} labels={['books', 'available', 'unavailable']} />
            </div>
            <div className='' style={{ height: '400px' }}>
              <DashBoard1 counts={[loanCount, loanCount2, loanCount3]} labels={['borrowed ', 'return', 'to return']} />
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
