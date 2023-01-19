import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import userReducer from "./user/UserSlice";
import indexReducer from "./indexSlice";
import bookReducer from "./book/BookSlice";
import loanReducer from "./borroweds/loanSlice";

export const store = configureStore({
  reducer: {
    index: indexReducer,
    user: userReducer,
    book: bookReducer,
    loan: loanReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
