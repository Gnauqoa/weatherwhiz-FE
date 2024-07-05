import { Typography } from "@mui/material";
import dayjs from "dayjs";
import useForecast from "../../../hooks/useForecast";
import wind from "../../../assets/wind.svg";
import drink from "../../../assets/drink.svg";

const currentHour = dayjs().hour();
let greeting = "";
if (currentHour < 12) greeting = "Good morning";
else if (currentHour < 18) greeting = "Good afternoon";
else greeting = "Good evening";

const CurrentWeather = () => {
  const { hourSelected } = useForecast();
  if (!hourSelected) return <></>;
  return (
    <div className="flex flex-col w-full h-[50%] items-center py-4 gap-3">
      <Typography sx={{ color: "#060606", fontSize: 30 }}>
        {greeting}
      </Typography>
      <Typography sx={{ color: "#060606", fontSize: 30 }}>
        {dayjs().format("h:mm A")}
      </Typography>
      <div className="flex flex-col items-center w-full justify my-auto gap-3">
        <div className="flex flex-row gap-4  items-center">
          <Typography sx={{ fontSize: 64, color: "#696969" }}>
            {hourSelected.temp_c.toFixed(0)}&deg;
          </Typography>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2">
              <img src={wind} alt="" className="w-[20px] h-[20px]" />
              <Typography sx={{ color: "#6c6c6c", fontWeight: 600 }}>
                {hourSelected.wind_mph} mph
              </Typography>
            </div>
            <div className="flex flex-row items-center gap-2">
              <img src={drink} alt="" className="w-[20px] h-[20px]" />
              <Typography sx={{ color: "#6c6c6c", fontWeight: 600 }}>
                {hourSelected.humidity}%
              </Typography>
            </div>
          </div>
        </div>
        <Typography sx={{ fontSize: 24, color: "#696969" }}>
          {hourSelected.condition.text.split(" ").slice(0, 2).join(" ")}
        </Typography>
      </div>
    </div>
  );
};

export default CurrentWeather;