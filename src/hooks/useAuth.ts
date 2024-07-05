import axios from "axios";
import { useDispatch, useSelector } from "../redux/store";
import { removeToken } from "../utils/local-storage";
import { getUserDetail, setUser } from "../redux/slices/user";
import { SignInFormProps, signIn } from "../apis/auth";
import { toast } from "react-toastify";

const useAuth = () => {
  const { isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    removeToken();
    dispatch(setUser(null));
    axios.defaults.headers.common["Authorization"] = null;
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
  if (isLoading || !user)
    return { logout, login, isAuth: false, user, isLoading };

  return { logout, login, isAuth: true, user, isLoading };
};

export default useAuth;
