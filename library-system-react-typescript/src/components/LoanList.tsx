import React from "react";
import { Book } from "../models/Book";
import { DatasWPage } from "../models/DatasPage";
import { Loan } from "../models/Loan";
import { Role } from "../models/Role";
import { User } from "../models/User";
import LoansListItems from "./LoansListItems";

type LoanListProps = {
  datas: DatasWPage<Loan<User<Role>, Book>> | null;
};

const LoanList = ({ datas }: LoanListProps) => {
  return (
    <>
      {datas &&
        datas?.data?.map((loan: Loan<User<Role>, Book>, index: number) => {
          return <LoansListItems key={index} loan={loan} />;
        })}
    </>
  );
};

export default LoanList;
