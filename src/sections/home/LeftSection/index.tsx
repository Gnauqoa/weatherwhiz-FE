import { CircularProgress } from "@mui/material";
import useForecast from "../../../hooks/useForecast";
import Body from "./body";
import Footer from "./footer";
import Header from "./header";

const FirstSection = () => {
  const { isLoading } = useForecast();
  return (
    <div className="flex flex-col space-between h-full">
      <Header />
      {isLoading ? (
        <div className="flex flex-col h-full w-full justify-center items-center">
          <CircularProgress size={100} sx={{ width: 100, height: 100 }} />
        </div>
      ) : (
        <>
          <Body />
          <Footer />
        </>
      )}
    </div>
  );
};

export default FirstSection;
