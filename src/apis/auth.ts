import { AxiosResponse } from "axios";
import axios from "../utils/axios";

import {
  AddUserType,
  UpdatePasswordPayload,
  UpdateUserPayload,
} from "../@types/user";

export type SignInFormProps = {
  email: string;
  password: string;
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
  return axios.put("/v1/users/current", payload);
};
export const changePassword = (
  payload: UpdatePasswordPayload
): Promise<AxiosResponse> => {
  return axios.put("/v1/users/current/password", payload);
};
