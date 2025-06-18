import React from 'react';
import Spinner from '@/components/ui/Spinner/Spinner';
type WeatherData = {
  weather: { icon: string; description: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
};

type ClimaProps = {
  weatherData: WeatherData;
};

function Clima({ weatherData }: ClimaProps) {
  if (!weatherData) return <div><Spinner /></div>;
  return (
    <div className="info-card">
      <h3>Weather and Meteorology</h3>
      <div className="current-weather">
        <div className="weather-main">
          <div className="weather-icon">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className="w-16 h-16"
            />
          </div>
          <div className="weather-temp">{Math.round(weatherData.main.temp)}°C</div>
          <div className="weather-desc">{weatherData.weather[0].description}</div>
        </div>
        <div className="weather-details">
          <div className="weather-detail">
            <span className="label">Feels Like</span>
            <span className="value">{Math.round(weatherData.main.feels_like)}°C</span>
          </div>
          <div className="weather-detail">
            <span className="label">Humidity</span>
            <span className="value">{weatherData.main.humidity}%</span>
          </div>
          <div className="weather-detail">
            <span className="label">Wind</span>
            <span className="value">{weatherData.wind.speed}km/h</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Clima