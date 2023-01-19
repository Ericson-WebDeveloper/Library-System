import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IndexState {
  globaLoading: boolean;
  RenewTokenModal: boolean;
  user_authetincate_loading: boolean;
}

const initialState: IndexState = {
  globaLoading: false,
  RenewTokenModal: false,
  user_authetincate_loading: false,
};

export const indexSlice = createSlice({
  name: "index",
  initialState,
  reducers: {
    SET_GLOBAL_LOADING: (state, action: PayloadAction<boolean>) => {
      state.globaLoading = action.payload;
    },
    SET_AUTH_LOADING: (state) => {
      state.user_authetincate_loading = true;
    },
    UNSET_AUTH_LOADING: (state) => {
      state.user_authetincate_loading = false;
    },
    SET_RENEW_TOKEN_MODAL_ACTIVE: (state) => {
      state.RenewTokenModal = false;
      state.RenewTokenModal = true;
    },
    SET_RENEW_TOKEN_MODAL_DEACTIVE: (state) => {
      state.RenewTokenModal = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  SET_GLOBAL_LOADING,
  SET_RENEW_TOKEN_MODAL_ACTIVE,
  SET_RENEW_TOKEN_MODAL_DEACTIVE,
  SET_AUTH_LOADING,
  UNSET_AUTH_LOADING,
} = indexSlice.actions;

export default indexSlice.reducer;
