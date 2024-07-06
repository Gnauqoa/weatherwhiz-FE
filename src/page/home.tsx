import { useEffect } from "react";
import useForecast from "../hooks/useForecast";
import LeftSection from "../sections/home/LeftSection";
import RightSection from "../sections/home/RightSection";

export default function Home() {
  const { search } = useForecast();

  useEffect(() => {
    search("Vietnam", "6");
  }, []);
  return (
    <div className="flex flex-row w-[90%] h-[70%] rounded-[16px] relative overflow-hidden">
      <div className="flex flex-col bg-[#fafafa] min-w-[70%] h-full py-8 px-20">
        <LeftSection />
      </div>
      <div className="flex flex-col bg-[#f6f6f6] w-full h-full py-2">
        <RightSection />
      </div>
    </div>
  );
}
