import { useSelector } from "../redux/store";

const useUser = () => {
  const { user } = useSelector((state) => state.user);
  return { user, isLogin: !!user };
};

export default useUser;
