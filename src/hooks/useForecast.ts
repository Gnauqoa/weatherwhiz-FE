import { useCallback } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { getForecastData, setCurrentSelected } from "../redux/slices/forecast";
import { DayCardProps } from "../components/DayCard";

const useForecast = () => {
  const { q, days, data, isLoading, currentSelected } = useSelector(
    (state) => state.forecast
  );

  const daySelected: DayCardProps | null = data
    ? currentSelected === "current"
      ? { id: "current", current: true, ...data.current }
      : {
          id: currentSelected,
          current: false,
          ...data.forecast.forecastday[Number(currentSelected.split("-")[1])]
            .hour[0],
        }
    : null;
  const dispatch = useDispatch();

  const select = (id: string) => {
    dispatch(setCurrentSelected(id));
  };
  const search = useCallback(
    async (q: string, days: string) => {
      dispatch(getForecastData({ q, days }));
    },
    [dispatch]
  );

  return {
    q,
    days,
    data,
    isLoading,
    daySelected,
    currentSelected,
    search,
    select,
  };
};

export default useForecast;
