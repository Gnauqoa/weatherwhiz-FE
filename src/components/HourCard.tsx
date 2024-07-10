import { Typography } from "@mui/material";
import useForecast from "../hooks/useForecast";
import { Hour } from "../@types/weather/forecast";
import dayjs from "../config/dayjs";

export type HourCardProps = Hour & { index: number };

const HourCard = (props: HourCardProps) => {
  const { data, currentHourIndex, selectHour } = useForecast();
  const isCurrent = currentHourIndex === props.index;
  if (!data) return <></>;
  return (
    <div
      onClick={() => selectHour(props.index)}
      style={{
        borderWidth: isCurrent ? "1px" : "0px",
      }}
      className="flex flex-col max-w-[92px] min-w-[92px] max-h-[180px] min-h-[180px] cursor-pointer items-center py-5 px-3 gap-3 transition-all bg-[#fafafa] hover:bg-[#e1e1e1] border-[1px] border-[#e8e8e8] rounded-[8px]"
    >
      <Typography sx={{ color: "#101010", fontSize: 16, fontWeight: 600 }}>
        {dayjs(props.time).format("h A")}
      </Typography>
      <p className="xl:text-[28px] text-[14px] text-[#101010]">
        {props.temp_c.toFixed(0)}&deg;
      </p>
      <p className="text-[#BDBDBD] font-[500] xl:mt-auto text-center">
        {props.condition.text.split(" ").slice(0, 2).join(" ")}
      </p>
    </div>
  );
};

export default HourCard;
