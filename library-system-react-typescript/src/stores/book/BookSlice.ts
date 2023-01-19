import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../models/Book";
import { DatasWPage } from "../../models/DatasPage";

interface BookInterface {
  books: DatasWPage<Book> | null;
  booksTemp: DatasWPage<Book> | null;
  book: Book | null;
  error: any | null;
  errors: any | null;
  success: any | null;
  bookLoading: boolean;
  booksCount: number;
  booksCount2: number;
  booksCount3: number;
}

const initialState: BookInterface = {
  books: null,
  booksTemp: null,
  book: null,
  error: null,
  errors: null,
  success: null,
  bookLoading: false,
  booksCount: 0,
  booksCount2: 0,
  booksCount3: 0,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    SET_BOOK_LOADING: (state, action: PayloadAction<boolean>) => {
      state.bookLoading = action.payload;
    },
    SET_BOOKS: (state, action: PayloadAction<DatasWPage<Book> | null>) => {
      state.books = action.payload;
      state.booksTemp = action.payload;
    },
    SET_BOOK: (state, action: PayloadAction<Book | null>) => {
      state.book = action.payload;
    },
    SET_BOOK_ERRORS: (
      state,
      action: PayloadAction<{ error: any | null; errors: any | null }>
    ) => {
      state.error = action.payload.error ? action.payload.error : null;
      state.errors = action.payload.errors ? action.payload.errors : null;
    },
    SET_BOOK_SUCCESS: (state, action: PayloadAction<any | null>) => {
      state.success = action.payload ? action.payload : null;
    },
    SET_BOOKS_COUNT_DASH: (
      state,
      action: PayloadAction<{
        Books_Count: number;
        Book_Available: number;
        Book_UnAvailable: number;
      }>
    ) => {
      state.booksCount = action.payload.Books_Count;
      state.booksCount2 = action.payload.Book_Available;
      state.booksCount3 = action.payload.Book_UnAvailable;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SET_BOOK_LOADING,
  SET_BOOKS,
  SET_BOOK,
  SET_BOOK_ERRORS,
  SET_BOOK_SUCCESS,
  SET_BOOKS_COUNT_DASH,
} = bookSlice.actions;

// export const authuser = (state) => state.user.auth_user;
// export const errorUser = (state) => state.user.error;

export default bookSlice.reducer;
