import { getToken, saveToken } from "./local-storage";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const interceptors = {
  request: [
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config = {
          ...config,
          headers: { Authorization: `Bearer ${token}` },
        };
      }

      return config;
    },
  ],
  response: [
    async (response: AxiosResponse) => {
      console.log(response.config.url)
      if (
        response.config.method?.toLocaleLowerCase() === "post" &&
        response.config.url?.includes("users/sign_in") 
      ) {
        console.log("save token")
        saveToken(response.data?.data?.access_token);
      }
      return response;
    },
  ],
  error: [
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.config.url !== "/users/current") {
        }
      }
      throw error;
    },
  ],
};

export default interceptors;
