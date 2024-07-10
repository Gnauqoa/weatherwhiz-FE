import { useEffect } from "react";
import useForecast from "../hooks/useForecast";
import LeftSection from "../sections/home/LeftSection";
import RightSection from "../sections/home/RightSection";
import Mobile from "../sections/home/Mobile";

export default function Home() {
  const { search } = useForecast();

  useEffect(() => {
    search("Vietnam", "6");
  }, []);
  return (
    <div className="flex flex-row w-[90%] xl:h-[70%] bg-[#f6f6f6] xl:bg-none hide-scrollbars max-h-[80%] rounded-[16px] relative overflow-auto xl:overflow-hidden">
      <div className="xl:flex hidden flex-col bg-[#fafafa] min-w-[70%] h-full py-8 px-20">
        <LeftSection />
      </div>
      <div className="hidden xl:flex flex-col bg-[#f6f6f6] w-full h-full py-2">
        <RightSection />
      </div>
      <div className="xl:hidden flex w-full h-full">
        <Mobile />
      </div>
    </div>
  );
}
