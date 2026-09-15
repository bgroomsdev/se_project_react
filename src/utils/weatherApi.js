import checkResponse from "./checkResponse";
import { apiKey, coordinates } from "./constants";

export function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${apiKey}`,
  ).then(checkResponse);
}

export function getWeatherCondition(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}

export function filterWeatherData(data) {
  const currentTime = Date.now() / 1000;
  const isDay = currentTime > data.sys.sunrise && currentTime < data.sys.sunset;

  const getWeatherType = (weatherId) => {
    if (weatherId >= 200 && weatherId <= 232) return "stormy";
    if (weatherId >= 300 && weatherId <= 531) return "rainy";
    if (weatherId >= 600 && weatherId <= 622) return "snowy";
    if (weatherId >= 701 && weatherId <= 781) return "foggy";
    if (weatherId >= 800) return "sunny";
    return "cloudy";
  };

  const weatherType = getWeatherType(data.weather[0].id);

  return {
    city: data.name,
    temp: {
      F: Math.round(data.main.temp),
      C: Math.round((data.main.temp - 32) * (5 / 9)),
    },
    condition: getWeatherCondition(data.main.temp),
    isDay,
    weatherType,
  };
}
