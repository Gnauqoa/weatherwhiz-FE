import { Outlet } from "react-router-dom";
import RootProvider from "./provider";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const RootLayout = () => {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden justify-center items-center bg-[#E9E9E9] relative">
      <div className="absolute right-[5%] top-[5%]">
        <IconButton onClick={() => logout()}>
          <LogoutIcon sx={{ color: "#101010" }} />
        </IconButton>
      </div>
      <RootProvider>
        <Outlet />
      </RootProvider>
    </div>
  );
};

export default RootLayout;
