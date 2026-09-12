import "../blocks/weather-card.css";
import sunnyDay from "../assets/sunnyDay.svg";
import cloudyDay from "../assets/cloudyDay.svg";
import rainyDay from "../assets/rainyDay.svg";
import stormyDay from "../assets/stormyDay.svg";
import snowyDay from "../assets/snowyDay.svg";
import foggyDay from "../assets/foggyDay.svg";
import sunnyNight from "../assets/sunnyNight.svg";
import cloudyNight from "../assets/cloudyNight.svg";
import rainyNight from "../assets/rainyNight.svg";
import stormyNight from "../assets/stormyNight.svg";
import snowyNight from "../assets/snowyNight.svg";
import foggyNight from "../assets/foggyNight.svg";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

const weatherImages = {
  sunny: { day: sunnyDay, night: sunnyNight },
  cloudy: { day: cloudyDay, night: cloudyNight },
  rainy: { day: rainyDay, night: rainyNight },
  stormy: { day: stormyDay, night: stormyNight },
  snowy: { day: snowyDay, night: snowyNight },
  foggy: { day: foggyDay, night: foggyNight },
};

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const timeOfDay = weatherData.isDay ? "day" : "night";
  const image = weatherImages[weatherData.weatherType]?.[timeOfDay];

  return (
    <div className="weather-card" style={{ backgroundImage: `url(${image})` }}>
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
    </div>
  );
}

export default WeatherCard;
