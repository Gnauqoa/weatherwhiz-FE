import { Typography } from "@mui/material";
import useForecast from "../../../hooks/useForecast";
import wind from "../../../assets/wind.svg";
import drink from "../../../assets/drink.svg";

const Body = () => {
  const { daySelected } = useForecast();
  if (!daySelected) return <></>;
  return (
    <div className="flex flex-row items-center w-full justify-center my-auto gap-3">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Typography sx={{ fontSize: 180, color: "#696969" }}>
          {daySelected.temp_c.toFixed(0)}&deg;
        </Typography>
        <Typography sx={{ mt: -8, fontSize: 50, color: "#696969" }}>
          {daySelected.condition.text.split(" ").slice(0, 2).join(" ")}
        </Typography>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center gap-2">
          <img src={wind} alt="" className="w-[32px] h-[32px]" />
          <Typography sx={{ color: "#6c6c6c", fontWeight: 600 }}>
            {daySelected.wind_mph} mph
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img src={drink} alt="" className="w-[32px] h-[32px]" />
          <Typography sx={{ color: "#6c6c6c", fontWeight: 600 }}>
            {daySelected.humidity}%
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Body;
