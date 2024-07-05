import { Outlet } from "react-router-dom";
import AuthProvider from "../../config/auth";

const AuthLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen overflow-auto justify-center items-center bg-[#E9E9E9]">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default AuthLayout;
