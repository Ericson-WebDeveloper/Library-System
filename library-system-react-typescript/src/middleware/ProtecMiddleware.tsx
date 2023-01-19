import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SET_LOGOUT } from "../stores/user/UserSlice";
import { toast } from "react-toastify";
import { useRef } from "react";
import { userLogout } from "../stores/user/UserActions"; //userMe

// import Cookies from 'js-cookie';
import Spinner from "../components/Spinner";
import { useAppSelector, useAppDispatch } from "../stores/store";

type ProtecMiddlewareProps = {};

const ProtecMiddleware = (props: ProtecMiddlewareProps) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const shouldRun = useRef(true);
  // const shouldRun2 = useRef(true);
  const { auth, auth_user: user } = useAppSelector((state) => state.user);
  const { globaLoading } = useAppSelector((state) => state.index);

  useEffect(() => {
    // try every page change autheticate in backend via api

    if (!auth || !user) {
      if (shouldRun.current) {
        shouldRun.current = false;
        toast.info("You Are UnAuthenticated", {
          // react - toastify can use in Redux
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          onClose: async () => {
            // call api logout
            await dispatch(userLogout());
            dispatch(SET_LOGOUT());
            <Navigate to="/" state={{ from: location }} replace />;
          },
        });
      }
    }

    // const getMe = async () => {
    //   return await dispatch(userMe());
    // }
    // if(!user && auth) {
    //   if(!getMe()) {
    //     if(shouldRun2.current) {
    //       shouldRun2.current = false;
    //       dispatch(SET_LOGOUT());
    //       <Navigate to='/' state={{ from: location }} replace />
    //     }
    //   }
    // }

    // return () => {
    //   shouldRun2.current = true;
    // }
  }, [dispatch, location, auth, user]);

  // return spinner here if call getMe
  if (globaLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  if (user && auth) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtecMiddleware;
