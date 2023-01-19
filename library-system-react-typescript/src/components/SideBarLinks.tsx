import React from "react";
import {
  faBook,
  faBookBookmark,
  faDashboard,
  faPersonRifle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Role } from "../models/Role";

type SideBarLinksProps = {
  setCollapseShow: React.Dispatch<React.SetStateAction<string>>;
  role: Role[];
};
type CompoundType = Role[] | string[];

const SideBarLinks = ({ setCollapseShow, role }: SideBarLinksProps) => {
  // const returnNotStringArr = (role: Role[] | string[]) => {
  //     role.every((r) => typeof r !== 'string')
  // }
  return (
    <>
      {role?.find((r: Role) => ["Librarian"].includes(r.name)) ? (
        <>
          <li
            className="items-center text-xl md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
                transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
          >
            <Link to="/library-system" onClick={() => setCollapseShow("")}>
              <FontAwesomeIcon icon={faDashboard} /> Dashboard
            </Link>
          </li>
          <li
            className="text-xl items-center md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
                transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
          >
            <Link to="/library-system/admin/books">
              <FontAwesomeIcon icon={faBook} /> Books{" "}
            </Link>
          </li>
          <li
            className="items-center text-xl md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
                transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
          >
            <Link to="/library-system/admin/librarian-user">
              <FontAwesomeIcon icon={faUser} /> Librarian's
            </Link>
          </li>
          <li
            className="items-center text-xl md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
                transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
          >
            <Link to="/library-system/admin/loans">
              <FontAwesomeIcon icon={faBookBookmark} /> Books Loans
            </Link>
          </li>
          <li
            className="items-center text-xl md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
                transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
          >
            <Link to="/library-system/admin/users">
              <FontAwesomeIcon icon={faUser} /> Users
            </Link>
          </li>
        </>
      ) : null}

      {role?.find((r: Role) => ["User"].includes(r.name)) ? (
        <>
          <li
            className="items-center text-xl md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
                    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
          >
            <Link to="/library-system/user" onClick={() => setCollapseShow("")}>
              <FontAwesomeIcon icon={faDashboard} /> Dashboard
            </Link>
          </li>
          <li
            className="items-center text-xl md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
                    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
          >
            <Link to="/library-system/user/books">
              <FontAwesomeIcon icon={faBook} /> Books
            </Link>
          </li>
          <li
            className="items-center text-xl md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
                    transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
          >
            <Link to="/library-system/user/loans">
              <FontAwesomeIcon icon={faBookBookmark} /> My Books Loan
            </Link>
          </li>
        </>
      ) : null}

      <li
        className="items-center text-xl md:text-md font-serif p-2 text-slate-50 md:space-x-2 rounded-lg
            transform hover:translate-x-1 transition-transform ease-in duration-200 hover:bg-slate-200 hover:text-black"
      >
        <Link to="/library-system/profile">
          <FontAwesomeIcon icon={faPersonRifle} /> Profile
        </Link>
      </li>
    </>
  );
};

export default SideBarLinks;
