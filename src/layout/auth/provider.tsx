import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { pathPage } from "../../routes/path";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth, initUser, init } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    initUser();
  }, []);
  useEffect(() => {
    if (isAuth && init) navigate(pathPage.root);
  }, [location.pathname, init, isAuth, navigate]);

  return <>{children}</>;
};

export default AuthProvider;
