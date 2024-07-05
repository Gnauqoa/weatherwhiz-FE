import axios from "axios";
import { useDispatch, useSelector } from "../redux/store";
import { removeToken } from "../utils/local-storage";
import { setUser } from "../redux/slices/user";

const useAuth = () => {
  const { isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logout = () => {
    removeToken();
    dispatch(setUser(null));
    axios.defaults.headers.common["Authorization"] = null;
  };
  if (isLoading || !user) return { isAuth: false, user, isLoading };

  return { logout, isAuth: true, user, isLoading };
};

export default useAuth;
