import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import TableBooksLits from "../../components/TableBooksLits";
import {
  faDownload,
  faPlus,
  faSearch,
  faTurnDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "react-router-dom";
// import { useDispatch } from 'react-redux';
import { getAllBooks } from "../../stores/book/BookAction";
import Spinner from "../../components/Spinner";
import { SET_BOOK_ERRORS, SET_BOOK_SUCCESS } from "../../stores/book/BookSlice";
import {
  returnErrorNotif,
  returnErrorsNotif,
  returnPageNumber,
  returnSuccessNotif,
} from "../../helper/ToastMotification";
import PaginationComponent from "../../components/PaginationComponent";
import {
  constructQuery,
  makeQueryParams,
  urlQueryParams,
} from "../../helper/QueryParams";
import { useAppSelector, useAppDispatch } from "../../stores/store";
import { Role } from "../../models/Role";

type BooksProps = {};

enum enumStatus {
  all = "all",
  available = "available",
  unavailable = "unavailable",
}

interface BookSerachInterface {
  isbn: string;
  title: string;
  author: string;
  status: enumStatus;
}

const Books = (props: BooksProps) => {
  const dispatch = useAppDispatch();
  const [page, setpage] = useSearchParams();
  const { auth_user } = useAppSelector((state) => state.user);
  const roles = auth_user?.role as Role[] | [];
  const {
    error: bookError,
    errors: bookErrors,
    success: bookSuccess,
    bookLoading,
    booksTemp: books,
  } = useAppSelector((state) => state.book);

  const [searchForm, setSearchForm] = useState<BookSerachInterface>({
    isbn: page.get("isbn") ? (page.get("isbn") as string) : "",
    title: page.get("title") ? String(page.get("title")) : "",
    author: page.get("author") ? String(page.get("author")) : "",
    status: page.get("status")
      ? enumStatus[page.get("status") as string]
      : enumStatus["all"],
  });
  const { isbn, title, author, status } = searchForm;

  const returnPage = useMemo(() => {
    return returnPageNumber(page);
  }, [page]);

  const shoudlRun = useRef(true);

  const resetForm = useCallback(() => {
    setSearchForm({
      isbn: "",
      title: "",
      author: "",
      status: enumStatus["all"],
    });
    let querys = constructQuery(searchForm);
    setpage({ ...querys, page: 1 });
  }, [searchForm, setpage]);

  const searchDatas = () => {
    let querys = constructQuery(searchForm);
    console.log(querys);
    setpage({ ...querys, page: 1 });
    let search = makeQueryParams(querys);
    dispatch(getAllBooks(1, search));
  };

  useEffect(() => {
    const fetchBooks = () => {
      if (shoudlRun.current) {
        shoudlRun.current = false;
        // get other query
        let querys = urlQueryParams();
        let search = makeQueryParams(querys);
        // let p = search.trim === '' ? returnPage : 1;
        // reset page -> conduct test
        // setpage({...querys, page: 1});
        // dispatch(getAllBooks(p, search));
        dispatch(getAllBooks(returnPage, search));
      }
    };

    fetchBooks();
  }, [dispatch, returnPage]);

  useEffect(() => {
    if (bookError) {
      let errorMsg = bookError;
      dispatch(SET_BOOK_ERRORS({ error: null, errors: null }));
      returnErrorNotif(errorMsg);
    }

    if (bookErrors) {
      let errors = bookErrors;
      dispatch(SET_BOOK_ERRORS({ error: null, errors: null }));
      returnErrorsNotif(errors);
    }

    if (bookSuccess) {
      let successMessage = bookSuccess;
      dispatch(SET_BOOK_SUCCESS(null));
      resetForm();
      page.delete("page");
      window.location.reload();
      returnSuccessNotif(successMessage);
    }
  }, [dispatch, bookError, bookSuccess, bookErrors, page, resetForm]);

  // return spinner
  if (bookLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col space-y-8 p-6">
        <h1 className="text-4xl font-serif font-bold">Books</h1>

        <div className="flex space-x-2">
          {roles?.find((r: Role) => r.name !== "User") ? (
            <>
              <Link
                to="/library-system/admin/book/add"
                className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
              >
                <FontAwesomeIcon icon={faPlus} /> New
              </Link>
              <button className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400">
                <FontAwesomeIcon icon={faDownload} /> Import
              </button>
            </>
          ) : null}
        </div>

        <div className="flex flex-col rounded-2xl border-[1px] border-black p-4 space-y-4">
          <div className="flex ">
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                className="w-[70%] p-2 rounded-lg"
                value={isbn}
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
                Author
              </label>
              <input
                type="text"
                name="author"
                className="w-[70%] p-2 rounded-lg"
                value={author}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex space-x-2 w-full justify-end items-center">
              <label htmlFor="" className="text-lg font-semibold font-serif">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="w-[70%] p-2 rounded-lg"
                value={title}
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
                Status
              </label>
              <select
                name="status"
                id="status"
                className="w-[70%] p-2 rounded-lg"
                value={status}
                onChange={(e) =>
                  setSearchForm((prev) => ({
                    ...prev,
                    status: enumStatus[e.target.value],
                  }))
                }
              >
                <option value="all">Select Status</option>
                <option value="available">Available</option>
                <option value="unavailable">UnAvailable</option>
              </select>
            </div>
          </div>

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
              onClick={resetForm}
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
                  Title
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
                      bg-gray-50 text-gray-500 border-gray-100`}
                >
                  ISBN
                </th>
                <th
                  className={`px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100`}
                >
                  Author
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
                  Status
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
              <TableBooksLits datas={books} />
            </tbody>
          </table>
        </div>
        {
          // https://www.capscom-technology.com/tutorial/react-js-and-laravel-pagination/Qy3PXRBQX6dk
          books?.data && books?.data?.length > 0 && (
            <div className="flex justify-start mt-5">
              <PaginationComponent
                activePage={books?.currePage}
                totalItemsCount={books?.totalDatas}
                itemsCountPerPage={books?.rowsPerPage}
                page={returnPage}
                fetchHook={getAllBooks}
                otherparam={null}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Books;
