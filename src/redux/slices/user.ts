import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { ReducerType } from "../../@types/request";
import { UserType } from "../../@types/user";
import { getCurrentUser } from "../../apis/auth";

// ----------------------------------------------------------------------

const initialState: { user: UserType } & ReducerType & { init: boolean } = {
  isLoading: false,
  error: null,
  user: null,
  init: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // GET User
    getUserDetailSuccess(state, action) {
      state.isLoading = false;
      state.init = true;
      state.user = { ...action.payload };
    },

    // SET User
    setUserDetailSuccess(state, action: { payload: UserType }) {
      state.isLoading = false;
      state.init = true;
      if (!action.payload) state.user = null;
      else state.user = { ...action.payload };
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getUserDetail() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await getCurrentUser();
      dispatch(slice.actions.getUserDetailSuccess(data.data));
    } catch (err) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
export function setUser(user: UserType) {
  return () => {
    dispatch(slice.actions.setUserDetailSuccess(user));
  };
}
