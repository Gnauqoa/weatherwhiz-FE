import axios from "axios";
import { useDispatch, useSelector } from "../redux/store";
import { removeToken } from "../utils/local-storage";
import {
  getUserDetail,
  setUser,
  updateNotifyWeather,
} from "../redux/slices/user";
import {
  SendVerifyCodeFormProps,
  SignInFormProps,
  UpdateNotifyWeatherFormProps,
  VerifyEmailFormProps,
  registerUser,
  sendVerifyCodeAPI,
  signIn,
  updateNotifyWeatherAPI,
  verifyEmail,
} from "../apis/auth";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { AddUserType } from "../@types/user";
import { useNavigate } from "react-router-dom";
import { pathPage } from "../routes/path";
import useToggle from "./useToggle";
import { getError } from "../utils/getErrors";

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

  const {
    toggle: isUpdateNotify,
    onClose: onUpdatedNotify,
    onOpen: onUpdatingNotify,
  } = useToggle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateNotifyData = useCallback(
    async (payload: UpdateNotifyWeatherFormProps) => {
      try {
        onUpdatingNotify();
        const { data } = await updateNotifyWeatherAPI(payload);
        dispatch(setUser(data.data));
        onUpdatedNotify();
        toast(payload?.notification_each_day ? "Subscribe success!" : "Unsubscribe success!", { type: "success" });
      } catch (err) {
        onUpdatedNotify();
      }
    },
    [onUpdatedNotify, onUpdatingNotify, dispatch]
  );
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
        onSended();
        toast(getError(err), {
          type: "error",
        });
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
        onVerified();
        toast(getError(err), {
          type: "error",
        });
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
      const user = await axios.get("/users/current");
      dispatch(setUser(user.data.data));
      toast("Login success", { type: "success" });
    } catch (err) {
      toast(getError(err), {
        type: "error",
      });
    }
  };
  const register = async (data: AddUserType) => {
    try {
      await registerUser(data);
      navigate(pathPage.login);
      toast("Register success, please check your mail box to verify email.", {
        type: "success",
      });
    } catch (err) {
      toast(getError(err), {
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
    updateNotifyData,
    sendVerifyCode,
    isUpdateNotify,
    isSendVerifyCode,
    isVerify,
    init,
    isAuth: isLoading || !user ? false : true,
    user,
    isLoading,
  };
};

export default useAuth;
