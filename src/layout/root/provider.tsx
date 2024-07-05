import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { pathPage } from "../../routes/path";

const RootProvider = ({ children }: { children: ReactNode }) => {
  const { isAuth, isLoading, initUser, init } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    if (!isAuth && init) navigate(pathPage.login);
  }, [isAuth, isLoading, init, navigate]);

  return <>{children}</>;
};
export default RootProvider;
