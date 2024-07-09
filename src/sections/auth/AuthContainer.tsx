import { ReactNode } from "react";

const AuthContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-4 bg-[#FAFAFA] px-6 py-8 rounded-[12px] w-[90%] xl:w-[30%] my-6 overflow-auto hide-scrollbars">
    {children}
  </div>
);
export default AuthContainer;
