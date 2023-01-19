import React from "react";
import Pagination from "react-js-pagination";
import { useSearchParams } from "react-router-dom";
import { makeQueryParams, urlQueryParams } from "../helper/QueryParams";
import { useAppDispatch } from "../stores/store";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

type PaginationComponentProps = {
  activePage: number;
  totalItemsCount: number;
  itemsCountPerPage: number;
  page: number;
  fetchHook: (
    page?: number,
    user_id?: string,
    search?: string | null
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  otherparam: any | null;
};

const PaginationComponent = ({
  activePage,
  totalItemsCount,
  itemsCountPerPage,
  page,
  fetchHook,
  otherparam,
}: PaginationComponentProps) => {
  const dispatch = useAppDispatch();
  const [pagen, setPage] = useSearchParams();
  return (
    <div style={{ display: "flex" }}>
      <Pagination
        activePage={activePage}
        totalItemsCount={totalItemsCount}
        itemsCountPerPage={itemsCountPerPage}
        onChange={async (pageNumber) => {
          if (pageNumber !== Number(page)) {
            let querys = urlQueryParams();
            let search = makeQueryParams(querys);
            // console.log(search);
            setPage({ ...querys, page: String(pageNumber) }, { replace: true });
            if (otherparam) {
              // set the
              dispatch(fetchHook(pageNumber, otherparam));
            } else {
              dispatch(fetchHook(pageNumber, search));
            }
          }
        }}
        itemClass="page-item"
        linkClass="page-link"
        firstPageText="First"
        lastPageText="Last"
      />
    </div>
  );
};

export default PaginationComponent;
