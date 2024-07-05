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
      if (
        "/api/v1/users/sign_in" === response.config.url ||
        "/api/v1/users" === response.config.url
      ) {
        saveToken(response.data?.data?.access_token);
      }
      return response;
    },
  ],
  error: [
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.config.url !== "/api/v1/users/current") {
        }
        // window.location.href = pathPage.login;
      }
      throw error;
    },
  ],
};

export default interceptors;
