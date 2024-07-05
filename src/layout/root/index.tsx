import { Outlet } from "react-router-dom";
import RootProvider from "./provider";

const RootLayout = () => {
  return (
    <div className="flex flex-col w-full h-screen overflow-auto justify-center items-center bg-[#E9E9E9]">
      <RootProvider>
        <Outlet />
      </RootProvider>
    </div>
  );
};

export default RootLayout;
