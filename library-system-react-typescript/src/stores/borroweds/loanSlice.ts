import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../models/Book";
import { User } from "../../models/User";
import { Role } from "../../models/Role";
import { Loan } from "../../models/Loan";
import { DatasWPage } from "../../models/DatasPage";

interface LoanInterface {
  bookSelected: Book | null;
  memebrSelected: User<Role> | null;
  loans: DatasWPage<Loan<User<Role>, Book>> | null;
  loansTemp: DatasWPage<Loan<User<Role>, Book>> | null;
  loanSelecteds: any | null; // check box in loan item list
  loan: Loan<User<Role>, Book> | null;
  loading: boolean;
  error: any | null;
  errors: any | null;
  success: any | null;
  userLoans: DatasWPage<Loan<User<Role>, Book>> | null;
  loanCount: number;
  loanCount2: number;
  loanCount3: number;
}

const initialState: LoanInterface = {
  bookSelected: null,
  memebrSelected: null,
  // loans: [],
  loans: null,
  loansTemp: null,
  loanSelecteds: null, // check box in loan item list
  loan: null,
  loading: false,
  error: null,
  errors: null,
  success: null,
  userLoans: null,
  loanCount: 0,
  loanCount2: 0,
  loanCount3: 0,
};

export const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    SET_LOAN_LOADING: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    SET_LOANS_OF_USER: (
      state,
      action: PayloadAction<DatasWPage<Loan<User<Role>, Book>> | null>
    ) => {
      state.userLoans = action.payload;
    },
    SET_LOAN_ERRORS: (
      state,
      action: PayloadAction<{ error: any | null; errors: any | null }>
    ) => {
      state.error = action.payload.error ? action.payload.error : null;
      state.errors = action.payload.errors ? action.payload.errors : null;
    },
    SET_LOAN_SUCCESS: (state, action: PayloadAction<any | null>) => {
      state.success = action.payload;
    },
    SET_BOOK_SELECTED: (state, action: PayloadAction<Book | null>) => {
      state.bookSelected = action.payload;
    },
    SET_MEMBER_SELECTED: (state, action: PayloadAction<User<Role> | null>) => {
      state.memebrSelected = action.payload;
    },
    SET_LOANS_LIST: (
      state,
      action: PayloadAction<DatasWPage<Loan<User<Role>, Book>> | null>
    ) => {
      state.loans = action.payload;
      state.loansTemp = action.payload;
    },
    SET_LOAN: (state, action: PayloadAction<Loan<User<Role>, Book> | null>) => {
      state.loan = action.payload;
    },
    SET_LOAN_ADMIN_DASH: (
      state,
      action: PayloadAction<{
        Loan_Count: number;
        Loan_Return: number;
        Loan_Not_Return: number;
      }>
    ) => {
      state.loanCount = action.payload.Loan_Count;
      state.loanCount2 = action.payload.Loan_Return;
      state.loanCount3 = action.payload.Loan_Not_Return;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SET_BOOK_SELECTED,
  SET_MEMBER_SELECTED,
  SET_LOAN_LOADING,
  SET_LOAN_ERRORS,
  SET_LOAN_SUCCESS,
  SET_LOANS_LIST,
  SET_LOAN,
  SET_LOANS_OF_USER,
  SET_LOAN_ADMIN_DASH,
} = loanSlice.actions;

// export const authuser = (state) => state.user.auth_user;
// export const errorUser = (state) => state.user.error;

export default loanSlice.reducer;
