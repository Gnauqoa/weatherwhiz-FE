import DayCard from "../../../components/DayCard";
import useForecast from "../../../hooks/useForecast";

const Footer = () => {
  const { data } = useForecast();

  if (!data) return <></>;
  return (
    <div className="flex flex-row items-center gap-4 w-full hide-scrollbars overflow-auto">
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

export default Footer;
