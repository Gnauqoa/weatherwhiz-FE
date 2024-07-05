import { useCallback } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { getForecastData } from "../redux/slices/forecast";

const useForecast = () => {
  const { q, days, data, isLoading } = useSelector((state) => state.forecast);
  const dispatch = useDispatch();

  const search = useCallback(
    async (q: string, days: string) => {
      dispatch(getForecastData({ q, days }));
    },
    [dispatch]
  );

  return { q, days, data, isLoading, search };
};

export default useForecast;
