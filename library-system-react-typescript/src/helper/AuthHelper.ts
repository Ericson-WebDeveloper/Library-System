import Cookies from "js-cookie";
import { Role } from "../models/Role";

export const getAuthCookieExpiration = () => {
  let date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
  return date;
};

export const setAsLogged = () => {
  Cookies.set("is_auth", "true", {
    path: "/",
    expires: getAuthCookieExpiration(),
    sameSite: "lax",
    httpOnly: false,
  });
};

export const setLogout = () => {
  Cookies.remove("is_auth", {
    path: "/",
    expires: getAuthCookieExpiration(),
    sameSite: "lax",
    httpOnly: false,
  });
};

export const getAuth = (): boolean => {
  // return Cookies.get("auth_token") || Cookies.get("refresh_token") ? true : false;
  return Cookies.get("is_auth") ? true : false;
};

export const getRefreshToken = () => {
  return Cookies.get("refresh_token") ?? null;
};

export const deleteToken = () => {
  Cookies.remove("refresh_token");
  Cookies.remove("auth_token");
  localStorage.removeItem("auth_user_");
};

export const getAuthToken = () => {
  return Cookies.get("auth_token") ?? null;
};

export const redirectByRole = (roles: Role[]) => {
  let url = "";
  roles.forEach(({ name }) => {
    if (name === "Librarian" || name === "Admin") {
      url = "/library-system";
    } else {
      url = "/library-system/user";
    }
  });
  return url;
};
