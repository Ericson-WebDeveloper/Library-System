import React, { useEffect } from "react";
import {
  faSave,
  faTurnDown,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { getBook, updateBook } from "../../stores/book/BookAction";
import Spinner from "../../components/Spinner";
import Select from "react-select";
import {
  customStylesSelect,
  selectOptionsCategory,
  selectStyle,
} from "../../helper/MockData";
import { imageToBas64 } from "../../helper/ImageHelper";
import { SET_BOOK_ERRORS, SET_BOOK_SUCCESS } from "../../stores/book/BookSlice";
import ErrorHooksNotif from "../../helper/hooks/ErrorHooksNotif";
import { useAppDispatch, useAppSelector } from "../../stores/store";

type EditBookProps = {};
export interface EditFormInterface {
  title: string;
  isbn: string;
  author: string;
  categories: Array<unknown> | [] | null;
  image: string;
  copies: number;
}

interface CategoriesInterface {
  value: any;
  label: string;
}

const EditBook = (props: EditBookProps) => {
  // const [copies, setCopies] = useState(Number(0));
  const {
    error: bookError,
    errors: bookErrors,
    success: bookSuccess,
    bookLoading,
    book,
  } = useAppSelector((state) => state.book);
  const { id_book } = useParams();
  const shouldRun = useRef(true);
  // const shouldRun2 = useRef(true);
  // const datasTemp = useRef([]);
  const dispatch = useAppDispatch();
  const [formEditData, setEditForm] = useState<EditFormInterface>({
    title: "",
    isbn: "",
    author: "",
    categories: null,
    image: "",
    copies: Number(0),
  });
  const { title, isbn, author, copies } = formEditData;
  const [selectedCategories, setSelectedCategories] = useState<
    CategoriesInterface[]
  >([]);

  const addcopy = () => {
    // setCopies((prev) => prev + 1);
    setEditForm((prev) => ({ ...prev, copies: copies + 1 }));
  };

  const minuscopy = () => {
    if (copies !== 0) {
      setEditForm((prev) => ({ ...prev, copies: copies - 1 }));
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      if (shouldRun.current) {
        shouldRun.current = false;
        await dispatch(getBook(id_book!));
      }
    };
    fetchBook();
  }, [dispatch, id_book, book]);

  useEffect(() => {
    if (book) {
      setEditForm({
        title: book.title,
        isbn: book.isbn,
        author: book.author,
        categories: book.categories,
        image: book.image as string,
        copies: Number(book.copies),
      });
      let arrayData: { value: string; label: string }[] = [];
      book.categories.forEach((category) => {
        arrayData.push({
          value: category,
          label: category.charAt(0).toUpperCase() + category.slice(1),
        });
        // setSelectedCategories((prev) => [...prev, {value:category, label: category.charAt(0).toUpperCase() + category.slice(1)}])
      });
      setSelectedCategories(arrayData);
    }
  }, [book]);

  ErrorHooksNotif(
    bookErrors,
    bookError,
    bookSuccess,
    SET_BOOK_ERRORS,
    SET_BOOK_SUCCESS
  );

  const imageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageToBas64(e.target, (image: string | ArrayBuffer | null) => {
      setEditForm((prev) => ({ ...prev, image: image ? String(image) : "" }));
    });
  };

  const handleSelectChange = (selectedOptn: any) => {
    setSelectedCategories(selectedOptn);
    // set selected here
  };

  const updatingBook = () => {
    const datas: EditFormInterface & { categories: Array<string> } = {
      ...formEditData,
      categories: selectedCategories?.map((cat) => cat.value),
    };
    dispatch(updateBook(id_book!, datas));
  };

  if (bookLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <>
      {book !== null && (
        <div className="w-full h-full bg-gray-100 rounded-xl">
          <div className="flex flex-col p-6 pt-8 space-y-6 w-8/12">
            <h1 className="text-4xl font-semibold font-serif">Edit Book</h1>
            <div className="flex space-x-3 items-center justify-end">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                className="w-[450px] px-4 py-4 rounded-lg"
                value={isbn}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex space-x-3 items-center justify-end">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="w-[450px] px-4 py-4 rounded-lg"
                value={title}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex space-x-3 items-center justify-end">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                Author
              </label>
              <input
                type="text"
                name="author"
                className="w-[450px] px-4 py-4 rounded-lg"
                value={author}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </div>
            {/* {
                    selectedCategories.length > 0
                    ? */}
            <div className="flex space-x-3 items-center justify-end">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                Category's
              </label>
              <span className="w-[450px] px-4 py-4 rounded-lg bg-white flex">
                {/* https://www.npmjs.com/package/react-select */}
                {/* https://www.youtube.com/watch?v=3u_ulMvTYZI */}
                {/* https://codesandbox.io/s/4w6wmo1n1x?file=/src/index.tsx  */}
                {/* https://codesandbox.io/examples/package/@types/react-select  */}
                {/* https://codesandbox.io/s/4w6wmo1n1x?file=/src/index.tsx  */}
                {/* https://codesandbox.io/s/qsrj2?file=/src/CustomSelect.tsx  */}
                {/* https://codesandbox.io/s/formik-react-select-example-using-typescript-forked-49pz4c?file=/index.tsx:1197-1203 */}
                {/*  */}
                {/*  */}
                <Select
                  styles={selectStyle}
                  // width='450px'
                  // menuColor='blue
                  value={selectedCategories}
                  //   onChange={setSelectedCategories}
                  onChange={handleSelectChange}
                  options={selectOptionsCategory}
                  isMulti={true}
                />
              </span>
            </div>
            {/*  : null } */}

            <div className="flex space-x-3 items-center justify-end">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                Image
              </label>
              <input
                type="file"
                name=""
                onChange={imageCapture}
                className="w-[450px] px-4 py-4 rounded-lg bg-white"
              />
            </div>
            <div className="flex space-x-3 items-center justify-end">
              <img src={formEditData?.image} alt="" className="h-36 w-[70%] " />
            </div>
            <div className="flex space-x-3 items-center justify-end">
              <label htmlFor="" className="text-xl font-semibold font-serif">
                Copies
              </label>
              <span>
                <button
                  className="p-2 px-4 py-3 bg-gray-300 text-xl rounded-lg hover:bg-gray-200"
                  onClick={() => minuscopy()}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <input
                  type="number"
                  readOnly
                  className="w-[350px] px-4 py-4 rounded-lg text-center"
                  value={copies}
                />
                <button
                  className="p-2 px-4 py-3 bg-gray-300 text-xl rounded-lg hover:bg-gray-200"
                  onClick={() => addcopy()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </span>
            </div>
            <div className="flex space-x-3 justify-center">
              <button
                type="button"
                onClick={() => updatingBook()}
                className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
              >
                <FontAwesomeIcon icon={faSave} /> Submit
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="p-2 py-2 px-6 bg-gray-600 text-white rounded-lg text-lg hover:bg-gray-400"
              >
                <FontAwesomeIcon icon={faTurnDown} />
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBook;
