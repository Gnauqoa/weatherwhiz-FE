import { useSearchParams } from "react-router-dom";
import { getForecastAPI } from "../apis/weather";
import { useCallback, useEffect, useState } from "react";
import { ForecastData } from "../@types/weather/forecast";
import useToggle from "./useToggle";

const useForecast = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggle: loading, onOpen: onLoading, onClose: onLoaded } = useToggle();
  const [data, setData] = useState<ForecastData | null>(null);
  const q = searchParams.get("q") || "";
  const days = Number(searchParams.get("days")) || 1;

  const getData = useCallback(
    async (q: string, days: number | string) => {
      onLoading();
      const res = await getForecastAPI({ q, days });
      setData(res.data.data);
      onLoaded();
    },
    [setData, onLoaded, onLoading]
  );

  const search = (params: { _q: string; _days?: string }) => {
    setSearchParams({
      q: params._q || q,
      days: params._days || days.toString(),
    });
  };

  useEffect(() => {
    getData(q, days);
  }, [q, days, getData]);

  return { q, days, data, loading, search };
};

export default useForecast;
