import HourCard from "../../../components/HourCard";
import useForecast from "../../../hooks/useForecast";

const Hours = () => {
  const { hourCurrentDays } = useForecast();
  if (!hourCurrentDays) return <></>;
  return (
    <div className="flex flex-row w-full min-h-[180px] items-center gap-4 hide-scrollbars overflow-y-hidden overflow-x-scroll">
      {hourCurrentDays.map((hour, index) => (
        <HourCard {...hour} key={`hour ${hour.time}`} index={index} />
      ))}
    </div>
  );
};

export default Hours;
