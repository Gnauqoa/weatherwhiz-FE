import CurrentWeather from "./current";
import Hours from "./hours";

const RightSection = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <CurrentWeather />
      <Hours />
    </div>
  );
};

export default RightSection;
