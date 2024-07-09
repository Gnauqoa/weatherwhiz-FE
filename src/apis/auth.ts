import { AxiosResponse } from "axios";
import axios from "../utils/axios";

import {
  AddUserType,
  UpdatePasswordPayload,
  UpdateUserPayload,
} from "../@types/user";

export type UpdateNotifyWeatherFormProps = {
  q?: string | undefined;
  notification_each_day?: boolean | undefined;
};
export type SignInFormProps = {
  email: string;
  password: string;
};
export type VerifyEmailFormProps = {
  code: string;
  user_id: string;
};
export type SendVerifyCodeFormProps = {
  user_id: string;
};
export const signIn = (payload: SignInFormProps): Promise<AxiosResponse> => {
  return axios.post("/api/v1/users/sign_in", {
    account: payload.email,
    password: payload.password,
  });
};

export const registerUser = (payload: AddUserType): Promise<AxiosResponse> => {
  return axios.post("/api/v1/users", payload);
};

export const getCurrentUser = (): Promise<AxiosResponse> => {
  return axios.get("/api/v1/users/current");
};
export const updateProfile = (
  payload: UpdateUserPayload
): Promise<AxiosResponse> => {
  return axios.put("/api/v1/users/current", payload);
};
export const changePassword = (
  payload: UpdatePasswordPayload
): Promise<AxiosResponse> => {
  return axios.put("/api/v1/users/current/password", payload);
};

export const verifyEmail = (
  payload: VerifyEmailFormProps
): Promise<AxiosResponse> => {
  return axios.put(`/api/v1/users/verify/${payload.user_id}/${payload.code}`);
};

export const sendVerifyCodeAPI = (payload: SendVerifyCodeFormProps) => {
  return axios.post(`/api/v1/users/verify/${payload.user_id}`);
};

export const updateNotifyWeatherAPI = (
  payload: UpdateNotifyWeatherFormProps
) => {
  return axios.put(`/api/v1/users/notification_weather`, payload);
};
