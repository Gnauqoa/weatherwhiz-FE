import axios, { AxiosResponse } from "axios";
import { DataResponseType } from "../@types/request";
import { ForecastData } from "../@types/weather/forecast";

export type getForecastParams = {
  q: string;
  days: number | string;
};

export const getForecastAPI = (
  params: getForecastParams
): Promise<AxiosResponse<DataResponseType<ForecastData>>> => {
  return axios.get("/weather/forecast", { params });
};
