import React from "react";
import SideBarLinks from "./SideBarLinks";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { useSelector } from 'react-redux';
import { useAppSelector } from "../stores/store";
import { Role } from "../models/Role";
//https://fontawesome.com/v5/docs/web/use-with/react

type SideBarProps = {
  collapseShow: string;
  setCollapseShow: React.Dispatch<React.SetStateAction<string>>;
};

const SideBar = ({ collapseShow, setCollapseShow }: SideBarProps) => {
  const { auth_user: user } = useAppSelector((state) => state.user);
  return (
    <>
      <div
        id="sidebarRefApp"
        className="h-screen w-[250px] top-0 p-2 hidden md:block bg-gray-800"
      >
        <span className="flex flex-col  mt-8 mb-4">
          <h1 className="text-2xl text-white text-center font-serif">
            Library System
          </h1>
          <h1 className="text-2xl text-white text-center font-serif">
            Menu List
          </h1>
        </span>

        <ul className="p-1 space-y-4 ml-4 w-full">
          <SideBarLinks
            setCollapseShow={setCollapseShow}
            role={user?.role as Role[]}
          />
        </ul>
      </div>

      <div
        className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative 
          md:hidden md:mt-4 md:shadow-none shadow absolute top-0 
          left-0 right-0 z-40 
          overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded bg-gray-900 ${collapseShow}`}
      >
        {/* Collapse header */}
        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
          <div className="flex flex-wrap">
            <div className="w-6/12">
              <Link
                className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase 
                font-bold p-4 px-0"
                to="/"
              >
                Menu List
              </Link>
            </div>
            <div className="w-6/12 flex justify-end">
              <button
                type="button"
                className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent 
                  hover:bg-gray-300"
                onClick={() => setCollapseShow("hidden")}
              >
                <i className="fas fa-times"></i>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        </div>
        {/* Form */}
        <form className="mt-6 mb-4 md:hidden">
          <div className="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-2 h-12 border-2 border-solid border-gray-500 
              placeholder-gray-300 text-black bg-white text-base leading-snug shadow-none outline-none focus:outline-none w-full 
              font-normal rounded-lg"
            />
          </div>
        </form>
        <hr className="my-4 md:min-w-full" />
        <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
          <SideBarLinks
            setCollapseShow={setCollapseShow}
            role={user?.role as Role[]}
          />
        </ul>
      </div>
    </>
  );
};

export default SideBar;
