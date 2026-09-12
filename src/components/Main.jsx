import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, onCardClick }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.condition,
  );

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const rows = Math.ceil(filteredItems.length / 4);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <div
        className={`main__content ${rows > 1 ? "main__content_multi-row" : ""}`}
      >
        <p className="main__title">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="main__items">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Main;
