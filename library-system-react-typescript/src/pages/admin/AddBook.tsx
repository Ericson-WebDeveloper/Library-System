import React, { useState } from "react";
import {
  faSave,
  faTurnDown,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import "../../assets/css/addbook.css";
import { imageToBas64 } from "../../helper/ImageHelper";
import { AddNewBook } from "../../stores/book/BookAction";
import Spinner from "../../components/Spinner";
import { SET_BOOK_ERRORS, SET_BOOK_SUCCESS } from "../../stores/book/BookSlice";
import { toast } from "react-toastify";
import { selectOptionsCategory, selectStyle } from "../../helper/MockData";
import ErrorHooksNotif from "../../helper/hooks/ErrorHooksNotif";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store";

const customStyles = {
  menu: (provided: any, state: any) => ({
    ...provided,
    width: state.selectProps.width || "350px",
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor || "blue",
    padding: 5,
    fontSize: 15,
  }),

  // control: (_, { selectProps: { width }}) => ({
  //   width: width
  // }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

export interface AddBookFormInterface {
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

type AddBookProps = {};

const AddBook = (props: AddBookProps) => {
  const dispatch = useAppDispatch();
  const filebookimg = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState<AddBookFormInterface>({
    title: "",
    isbn: "",
    author: "",
    categories: null,
    image: "",
    copies: Number(0),
  });
  const {
    error: bookError,
    errors: bookErrors,
    success: bookSuccess,
    bookLoading,
  } = useAppSelector((state) => state.book);

  const [selectedCategories, setSelectedCategories] = useState<
    CategoriesInterface[]
  >([]);
  const { title, isbn, author, copies } = formData;

  const addcopy = () => {
    setFormData((prev) => ({ ...prev, copies: copies + 1 }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      isbn: "",
      author: "",
      categories: null,
      image: "",
      copies: Number(0),
    });
    setSelectedCategories([]);
  };

  const minuscopy = () => {
    if (copies !== 0) {
      setFormData((prev) => ({ ...prev, copies: copies - 1 }));
    }
  };

  const imageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    let types = e.target?.files![0].type.split("/");
    if (types[0] !== "image" || !["png", "jpeg", "jpg"].includes(types[1])) {
      toast.error(`Book Image are invalid file`, {
        theme: "dark",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return false;
    }

    imageToBas64(e.target, (image) => {
      setFormData((prev) => ({ ...prev, image: image ? String(image) : "" }));
    });
  };

  const extractCategories = (categories: CategoriesInterface[] | []) => {
    return categories.map((cat) => cat.value);
  };

  const submitNewBook = () => {
    const datas: AddBookFormInterface & { categories: Array<string> } = {
      ...formData,
      categories: extractCategories(selectedCategories),
    };
    dispatch(AddNewBook(datas));
  };

  const handleSelectChange = (selectedOptn: any) => {
    setSelectedCategories(selectedOptn);
    // set selected here
  };

  ErrorHooksNotif(
    bookErrors,
    bookError,
    bookSuccess,
    SET_BOOK_ERRORS,
    SET_BOOK_SUCCESS,
    resetForm
  );

  // return spinner
  if (bookLoading) {
    return <Spinner crl="Blue" loading={true} />;
  }

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl">
      <div className="flex flex-col p-6 pt-8 space-y-6 w-8/12">
        <h1 className="text-4xl font-semibold font-serif">New Book(s)</h1>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            id="isbn"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={isbn}
            onChange={(e) =>
              setFormData((prev) => ({
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
            id="title"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={title}
            onChange={(e) =>
              setFormData((prev) => ({
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
            id="author"
            className="w-[450px] px-4 py-4 rounded-lg"
            value={author}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Category
          </label>
          {/* <select name="" id="" className='w-[450px] px-4 py-4 rounded-lg'>
                      <option value="" className='w-[450px] px-4 py-4 rounded-lg'>Select Categories</option>
                  </select> */}
          <span className="w-[450px] px-4 py-4 rounded-lg bg-white flex">
            {/* https://www.npmjs.com/package/react-select */}
            <Select
              styles={selectStyle}
              // defaultValue={selectedCategories}
              value={selectedCategories}
              onChange={handleSelectChange}
              options={selectOptionsCategory}
              isMulti={true}
              // width='450px'
              // menuColor='blue'
            />
          </span>
        </div>
        <div className="flex space-x-3 items-center justify-end">
          <label htmlFor="" className="text-xl font-semibold font-serif">
            Image
          </label>
          <input
            type="file"
            ref={filebookimg}
            onChange={imageCapture}
            className="w-[450px] px-4 py-4 rounded-lg bg-white"
          />
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
            onClick={submitNewBook}
            className="p-2 py-2 px-6 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-400"
          >
            <FontAwesomeIcon icon={faSave} /> Submit
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
    </div>
  );
};

export default AddBook;
