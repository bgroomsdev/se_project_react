import "../blocks/weather-card.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const weatherImages = {
    sunny: {
      day: `${import.meta.env.BASE_URL}sunnyDay.svg`,
      night: `${import.meta.env.BASE_URL}sunnyNight.svg`,
    },
    cloudy: {
      day: `${import.meta.env.BASE_URL}cloudyDay.svg`,
      night: `${import.meta.env.BASE_URL}cloudyNight.svg`,
    },
    rainy: {
      day: `${import.meta.env.BASE_URL}rainyDay.svg`,
      night: `${import.meta.env.BASE_URL}rainyNight.svg`,
    },
    stormy: {
      day: `${import.meta.env.BASE_URL}stormyDay.svg`,
      night: `${import.meta.env.BASE_URL}stormyNight.svg`,
    },
    snowy: {
      day: `${import.meta.env.BASE_URL}snowyDay.svg`,
      night: `${import.meta.env.BASE_URL}snowyNight.svg`,
    },
    foggy: {
      day: `${import.meta.env.BASE_URL}foggyDay.svg`,
      night: `${import.meta.env.BASE_URL}foggyNight.svg`,
    },
  };

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
