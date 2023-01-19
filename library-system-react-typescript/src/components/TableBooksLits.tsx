import React from "react"; //, { useState }
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom';
import TableBookListItems from "./TableBookListItems";
import { Book } from "../models/Book";
import { DatasWPage } from "../models/DatasPage";

type TableBooksLitsProps = {
  datas: DatasWPage<Book> | null;
};

const TableBooksLits = ({ datas }: TableBooksLitsProps) => {
  return (
    <>
      {datas?.data?.map((book, index) => {
        return <TableBookListItems key={index} book={book} />;
      })}
    </>
  );
};

export default TableBooksLits;
