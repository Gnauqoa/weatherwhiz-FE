import axios from "axios";
import { useDispatch, useSelector } from "../redux/store";
import { removeToken } from "../utils/local-storage";
import { getUserDetail, setUser } from "../redux/slices/user";
import { SignInFormProps, registerUser, signIn } from "../apis/auth";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { AddUserType } from "../@types/user";

const useAuth = () => {
  const { isLoading, user, init } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    removeToken();
    dispatch(setUser(null));
    axios.defaults.headers.common["Authorization"] = null;
  };
  const initUser = useCallback(() => {
    if (!init && !isLoading) {
      dispatch(getUserDetail());
    }
  }, [init, isLoading, dispatch]);
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
    getUser,
    initUser,
    register,
    init,
    isAuth: isLoading || !user ? false : true,
    user,
    isLoading,
  };
};

export default useAuth;
