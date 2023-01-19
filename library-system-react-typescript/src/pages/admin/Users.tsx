import React, { useState } from "react";
import TableUsersList from "../../components/TableUsersList";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { users } from "../../stores/user/UserActions";
import Spinner from "../../components/Spinner";
import {
  SET_MESSAGE_SUCCESS,
  SET_USER_ERROR,
} from "../../stores/user/UserSlice";
import { returnPageNumber } from "../../helper/ToastMotification";
import { useMemo } from "react";
import "../../assets/css/paginate.css";
import ErrorHooksNotif from "../../helper/hooks/ErrorHooksNotif";
import PaginationComponent from "../../components/PaginationComponent";
import {
  constructQuery,
  makeQueryParams,
  urlQueryParams,
} from "../../helper/QueryParams";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import {
  faDownload,
  faPlus,
  faSearch,
  faTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type UsersProps = {};

const Users = (props: UsersProps) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useSearchParams();
  const [searchForm, setSearchForm] = useState<{
    fullname: string;
    email: string;
  }>({
    fullname: page.get("fullname") ? (page.get("fullname") as string) : "",
    email: page.get("email") ? (page.get("email") as string) : "",
  });
  const shoudlRun = useRef(true);
  const {
    user_loading,
    error: Usererror,
    errors: Usererrors,
    success_message: Usersuccess,
    userList,
  } = useAppSelector((state) => state.user);

  const { fullname, email } = searchForm;

  const returnPage = useMemo((): number => {
    return returnPageNumber(page);
  }, [page]);

  const resetSearchForm = () => {
    setSearchForm({
      fullname: "",
      email: "",
    });
    setPage({ page: String(1) });
  };

  const searchDatas = () => {
    if (!fullname && !email) {
      return false;
    }
    let querys = constructQuery(searchForm);
    setPage({ ...querys, page: String(1) });
    let search = makeQueryParams(querys);
    dispatch(users(1, search));
  };

  useEffect(() => {
    const fetchUsers = () => {
      if (shoudlRun.current) {
        shoudlRun.current = false;
        let querys = urlQueryParams();
        let search = makeQueryParams(querys);
        dispatch(users(returnPage, search));
      }
    };
    fetchUsers();
  }, [dispatch, returnPage]);

  ErrorHooksNotif(
    Usererrors,
    Usererror,
    Usersuccess,
    SET_USER_ERROR,
    SET_MESSAGE_SUCCESS
  );

  // return spinner
  if (user_loading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col space-y-8 p-6">
        <h1 className="text-4xl font-serif font-bold">Users</h1>

        <div className="flex space-x-2">
          <Link
            to="/library-system/admin/user/add"
            className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
          >
            <FontAwesomeIcon icon={faPlus} /> New
          </Link>
          <button className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400">
            <FontAwesomeIcon icon={faDownload} /> Import
          </button>
        </div>

        <div className="flex flex-col rounded-2xl border-[1px] border-black p-4 space-y-4">
          <div className="flex ">
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-[70%] p-2 rounded-lg"
                value={email}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                className="w-[70%] p-2 rounded-lg"
                value={fullname}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex"></div>

          <div className="flex justify-end items-center pr-5 space-x-6">
            <button
              type="button"
              onClick={searchDatas}
              className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
            >
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
            <button
              type="button"
              onClick={resetSearchForm}
              className="p-2 py-2 px-6 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-400"
            >
              <FontAwesomeIcon icon={faTurnDown} />
              Reset
            </button>
          </div>
        </div>

        {/* table */}

        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse ">
            <thead>
              <tr>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Name
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
                    bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Email
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Warning
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                    bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Photo
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
                    bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Regsitered At
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
              <TableUsersList users={userList} />
            </tbody>
          </table>
        </div>
        {
          // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
          userList?.data && userList?.data?.length > 0 && (
            <div className="flex justify-start mt-5">
              <PaginationComponent
                activePage={userList?.currePage}
                totalItemsCount={userList?.totalDatas}
                itemsCountPerPage={userList?.rowsPerPage}
                page={returnPage}
                fetchHook={users}
                otherparam={null}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Users;
