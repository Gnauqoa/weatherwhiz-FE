import { Typography } from "@mui/material";
import useForecast from "../hooks/useForecast";
import { Current } from "../@types/weather/current";
import { Hour } from "../@types/weather/forecast";
import dayjs from "../config/dayjs";

export type DayCardProps =
  | (Current & { current: true; id: string })
  | (Hour & { current: false; id: string });

const DayCard = (props: DayCardProps) => {
  const { data, currentSelected, select } = useForecast();
  const isCurrent = currentSelected === props.id;
  if (!data) return <></>;
  return (
    <div
      onClick={() => select(props.id)}
      style={{
        borderWidth: isCurrent ? "1px" : "0px",
      }}
      className="flex flex-col max-w-[92px] min-w-[92px] max-h-[180px] min-h-[180px] cursor-pointer items-center py-5 px-3 gap-3 transition-all bg-[#fafafa] hover:bg-[#e1e1e1] border-[1px] border-[#e8e8e8] rounded-[8px]"
    >
      <Typography sx={{ color: "#101010", fontSize: 16, fontWeight: 600 }}>
        {props.current ? "To day" : dayjs(props.time).format("ddd")}
      </Typography>
      <Typography sx={{ fontSize: 28, color: "#101010" }}>
        {props.temp_c.toFixed(0)}&deg;
      </Typography>
      <Typography
        sx={{
          color: "#BDBDBD",
          mt: "auto",
          fontWeight: 500,
          textAlign: "center ",
        }}
      >
        {props.condition.text.split(" ").slice(0, 2).join(" ")}
      </Typography>
    </div>
  );
};

export default DayCard;
