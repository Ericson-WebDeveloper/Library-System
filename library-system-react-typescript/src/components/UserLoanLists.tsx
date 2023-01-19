import React from "react";
import { Book } from "../models/Book";
import { DatasWPage } from "../models/DatasPage";
import { Loan } from "../models/Loan";
import { Role } from "../models/Role";
import { User } from "../models/User";
import UserLoanListItems from "./UserLoanListItems";

type UserLoanListsProps = {
  datas: DatasWPage<Loan<User<Role>, Book>> | null;
};

const UserLoanLists = ({ datas }: UserLoanListsProps) => {
  return (
    <table className="items-center w-full bg-transparent border-collapse ">
      <thead>
        <tr>
          {/* <th className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
          bg-gray-50 text-gray-500 border-gray-100`}
            >
             
            </th> */}
          <th
            className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
          bg-gray-50 text-gray-500 border-gray-100`}
          >
            Book Title
          </th>
          <th
            className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
              bg-gray-50 text-gray-500 border-gray-100`}
          >
            Book ISBN
          </th>
          <th
            className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`}
          >
            Book Image
          </th>
          <th
            className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
              bg-gray-50 text-gray-500 border-gray-100`}
          >
            Issue Date
          </th>
          <th
            className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
              bg-gray-50 text-gray-500 border-gray-100`}
          >
            Due Date
          </th>
          <th
            className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
              bg-gray-50 text-gray-500 border-gray-100`}
          >
            Return Date
          </th>
          <th
            className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
              bg-gray-50 text-gray-500 border-gray-100`}
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {datas && datas?.data
          ? datas.data.map((data, index) => {
              return <UserLoanListItems key={index} data={data} />;
            })
          : null}
      </tbody>
    </table>
  );
};

export default UserLoanLists;
