import axios from "axios";
import { useDispatch, useSelector } from "../redux/store";
import { removeToken } from "../utils/local-storage";
import { getUserDetail, setUser } from "../redux/slices/user";
import {
  SendVerifyCodeFormProps,
  SignInFormProps,
  VerifyEmailFormProps,
  registerUser,
  sendVerifyCodeAPI,
  signIn,
  verifyEmail,
} from "../apis/auth";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { AddUserType } from "../@types/user";
import { useNavigate } from "react-router-dom";
import { pathPage } from "../routes/path";
import useToggle from "./useToggle";

const useAuth = () => {
  const { isLoading, user, init } = useSelector((state) => state.user);
  const {
    toggle: isVerify,
    onClose: onVerified,
    onOpen: onVerifying,
  } = useToggle();
  const {
    toggle: isSendVerifyCode,
    onClose: onSended,
    onOpen: onSending,
  } = useToggle();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = useCallback(
    (isToast: boolean = true) => {
      removeToken();
      dispatch(setUser(null));
      axios.defaults.headers.common["Authorization"] = null;
      if (isToast) toast("Logout success", { type: "success" });
    },
    [dispatch]
  );
  const sendVerifyCode = useCallback(
    async (payload: SendVerifyCodeFormProps) => {
      try {
        onSending();
        await sendVerifyCodeAPI(payload);
        onSended();
        toast("Send verify code success! Please check your mail box.", {
          type: "success",
        });
      } catch (err) {
        const multipleErrors = (err as any).response?.data?.error?.errors;
        onSended();
        toast(
          multipleErrors
            ? (err as any).response?.data?.error?.errors.join(".")
            : (err as any).response?.data?.error,
          {
            type: "error",
          }
        );
      }
    },
    [onSended, onSending]
  );
  const verify = useCallback(
    async (payload: VerifyEmailFormProps) => {
      try {
        onVerifying();
        await verifyEmail(payload);
        onVerified();
        toast("Verify email success! Please login.", { type: "success" });
        navigate(pathPage.login);
      } catch (err) {
        const multipleErrors = (err as any).response?.data?.error?.errors;
        onVerified();
        toast(
          multipleErrors
            ? (err as any).response?.data?.error?.errors.join(".")
            : (err as any).response?.data?.error,
          {
            type: "error",
          }
        );
      }
    },
    [navigate, onVerified, onVerifying]
  );
  const initUser = useCallback(() => {
    if (!init && !isLoading) {
      dispatch(getUserDetail());
    }
    if (init && !isLoading && !user) logout(false);
  }, [init, isLoading, dispatch, user, logout]);
  const getUser = () => {
    if (!isLoading) dispatch(getUserDetail());
  };
  const login = async (data: SignInFormProps) => {
    try {
      removeToken();
      axios.defaults.headers.common["Authorization"] = "";
      const res = await signIn(data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.access_token}`;
      const user = await axios.get("/api/v1/users/current");
      dispatch(setUser(user.data.data));
      toast("Login success", { type: "success" });
    } catch (err) {
      toast((err as any).response?.data?.error?.errors.join("."), {
        type: "error",
      });
    }
  };
  const register = async (data: AddUserType) => {
    try {
      const res = await registerUser(data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data.access_token}`;
      const user = await axios.get("/api/v1/users/current");
      dispatch(setUser(user.data.data));
      toast("Register success", { type: "success" });
    } catch (err) {
      toast((err as any).response?.data?.error?.errors.join("."), {
        type: "error",
      });
    }
  };
  return {
    logout,
    login,
    verify,
    getUser,
    initUser,
    register,
    sendVerifyCode,
    isSendVerifyCode,
    isVerify,
    init,
    isAuth: isLoading || !user ? false : true,
    user,
    isLoading,
  };
};

export default useAuth;
