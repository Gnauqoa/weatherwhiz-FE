import HourCard from "../../../components/HourCard";
import useForecast from "../../../hooks/useForecast";

const Hours = () => {
  const { hourCurrentDays } = useForecast();
  if (!hourCurrentDays) return <></>;
  return (
    <div className="flex flex-col w-full h-[50%] overflow-auto max-h-[50%] px-4 items-center">
      <div className="grid grid-cols-3 pb-3 gap-y-3 gap-x-3">
        {hourCurrentDays.map((hour, index) => (
          <HourCard {...hour} key={`hour ${hour.time}`} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Hours;
