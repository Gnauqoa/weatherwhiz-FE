import { ReactNode, useEffect } from "react";
import { useDispatch } from "../redux/store";
import { getUserDetail } from "../redux/slices/user";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { pathPage } from "../routes/path";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserDetail());
  }, []);
  useEffect(() => {
    if (isAuth && location.pathname === "/login") {
      navigate(pathPage.root);
    }
  }, [location.pathname]);
  useEffect(() => {}, []);
  return <>{children}</>;
};

export default AuthProvider;
