import React from "react";
// import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Role } from "../models/Role";
import { useAppSelector } from "../stores/store";

type RoleMiddlewareProps = {
  allowedRoles: Array<string>;
};

const RoleMiddleware = ({ allowedRoles }: RoleMiddlewareProps) => {
  const location = useLocation();
  const { auth_user } = useAppSelector((state) => state.user);
  const roles = auth_user?.role as Role[] | [];
  return roles?.find(({ name }) => allowedRoles?.includes(name)) ? (
    <Outlet />
  ) : (
    <Navigate
      to="/library-system/unauthorized"
      state={{ from: location }}
      replace
    />
  );
};

export default RoleMiddleware;
