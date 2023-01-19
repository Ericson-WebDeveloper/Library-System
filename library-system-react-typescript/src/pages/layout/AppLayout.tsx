import React, { useEffect } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import { Outlet, useLocation } from "react-router-dom";
// import { userMe } from '../../stores/user/UserActions';
import ResetToken from "../../components/Modals/ResetToken";
import { useRef } from "react";
import Spinner from "../../components/Spinner";
import "../../assets/css/pagination.css";
import { useAppSelector, useAppDispatch } from "../../stores/store";

type AppLayoutProps = {};

const AppLayout = (props: AppLayoutProps) => {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const dispatch = useAppDispatch();
  const { RenewTokenModal, user_authetincate_loading } = useAppSelector(
    (state) => state.index
  );
  const shouldRun = useRef(false);
  const location = useLocation();

  useEffect(() => {
    const authentictae = async () => {
      if (shouldRun.current) {
        shouldRun.current = false;
        // ng doduble rerender dito because update user
        // await dispatch(userMe());
      }
    };

    authentictae();

    return () => {
      shouldRun.current = true;
    };
  }, [dispatch, location]);

  return (
    <div className="flex max-h-max w-full">
      <SideBar collapseShow={collapseShow} setCollapseShow={setCollapseShow} />

      {/* content */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* top Nav */}
        <NavBar setCollapseShow={setCollapseShow} />
        {/* content */}
        <div className="h-screen w-full px-8 pt-24 pb-12">
          {user_authetincate_loading ? (
            <Spinner crl="Blue" loading={true} />
          ) : // option para nde na mgareset un mga usestate data
          !RenewTokenModal ? (
            <Outlet />
          ) : null}
        </div>
      </div>
      <ResetToken show={RenewTokenModal} />
      {/* sidebar */}
    </div>
  );
};

export default AppLayout;
