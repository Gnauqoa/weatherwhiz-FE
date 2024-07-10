import { useCallback } from "react";
import { useDispatch, useSelector } from "../redux/store";
import {
  getForecastData,
  setCurrentHourIndex,
  setCurrentSelected,
} from "../redux/slices/forecast";
import { DayCardProps } from "../components/DayCard";
import { Hour } from "../@types/weather/forecast";
import { toast } from "react-toastify";
import { FunctionBase } from "lodash";

const useForecast = () => {
  const { q, days, data, isLoading, currentSelected, currentHourIndex } =
    useSelector((state) => state.forecast);
  const hourSelected: Hour | null = data
    ? currentSelected === "current"
      ? data.forecast.forecastday[0].hour[currentHourIndex]
      : data.forecast.forecastday[Number(currentSelected.split("-")[1])].hour[
          currentHourIndex
        ]
    : null;
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
  const selectHour = (index: number) => {
    dispatch(setCurrentHourIndex(index));
  };
  const select = (id: string) => {
    dispatch(setCurrentSelected(id));
  };
  const search = useCallback(
    async (q: string, days: string, callback?: Function) => {
      await dispatch(getForecastData({ q, days }));
      if (callback) callback();
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
    hourSelected,
    currentHourIndex,
    hourCurrentDays: data
      ? currentSelected === "current"
        ? data.forecast.forecastday[0].hour
        : data.forecast.forecastday[Number(currentSelected.split("-")[1])].hour
      : null,
    search,
    select,
    selectHour,
  };
};

export default useForecast;
