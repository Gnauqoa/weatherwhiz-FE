import axios from "axios";
import { useDispatch, useSelector } from "../redux/store";
import { removeToken } from "../utils/local-storage";
import { setUser } from "../redux/slices/user";
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
      await signIn(data);
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
