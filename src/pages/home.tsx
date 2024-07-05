import { useEffect } from "react";
import useForecast from "../hooks/useForecast";
import FirstSection from "../sections/home/LeftSection";

export default function Home() {
  const { search } = useForecast();

  useEffect(() => {
    search("London", "1");
  }, []);
  return (
    <div className="flex flex-row w-[90%] h-[80%] rounded-[16px] relative overflow-hidden">
      <div className="flex flex-col bg-[#fafafa] min-w-[70%] h-full py-8 px-20">
        <FirstSection />
      </div>
      <div className="flex flex-col bg-[#f6f6f6] w-full h-full py-2"></div>
    </div>
  );
}
