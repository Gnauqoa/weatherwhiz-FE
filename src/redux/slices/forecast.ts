import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { ReducerType } from "../../@types/request";
import { ForecastData } from "../../@types/weather/forecast";
import { getForecastAPI } from "../../apis/weather";

// ----------------------------------------------------------------------

const initialState: {
  data: ForecastData | null;
  q: string;
  days: string;
} & ReducerType = {
  q: "current",
  days: "1",
  isLoading: false,
  error: null,
  data: null,
};

const slice = createSlice({
  name: "forecast",
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
    setForecastData(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    setQueryData(state, action) {
      state.q = action.payload.q;
      state.days = action.payload.days;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export function getForecastData({ q, days }: { q: string; days: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    dispatch(slice.actions.setQueryData({ q, days }));
    try {
      const { data } = await getForecastAPI({ q, days });
      dispatch(slice.actions.setForecastData(data));
    } catch (err) {
      dispatch(slice.actions.hasError(err));
    }
  };
}
