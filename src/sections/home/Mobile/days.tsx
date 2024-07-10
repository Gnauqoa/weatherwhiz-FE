import DayCard from "../../../components/DayCard";
import useForecast from "../../../hooks/useForecast";

const Days = () => {
  const { data } = useForecast();
  if (!data) return <></>;
  return (
    <div className="flex flex-row w-full min-h-[180px] items-center gap-4 hide-scrollbars overflow-y-hidden overflow-x-scroll">
      <DayCard current={true} {...data.current} id="current" />
      {data.forecast.forecastday.slice(1).map((forecastday, index) => (
        <DayCard
          key={`daycard-${index}`}
          current={false}
          {...forecastday.hour[0]}
          id={`daycard-${index}`}
        />
      ))}
    </div>
  );
};

export default Days;
