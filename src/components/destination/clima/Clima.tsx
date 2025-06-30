import React from 'react';
import Spinner from '@/components/ui/Spinner/Spinner';
import { Thermometer, Droplets, Wind } from "lucide-react"
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
    <div className="card">
      <div className="card-header ">
        <Thermometer className="icon" />
        <h2 className="card-title">Weather</h2>
      </div>
      <div className="card-content">
        <div className="weather-main">
          <div className="temperature weather-icon-bg" style={{
              backgroundImage: `url(https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png)`,
            }}
            aria-label={weatherData.weather[0].description}
            role="img">{Math.round(weatherData.main.temp)}°C</div>
        
          <p className="weather-condition">{weatherData.weather[0].description}</p>
           
        </div>
        <div className="weather-details">
          <div className="weather-item temp">
            <Thermometer className="weather-icon temp" />
            <p className="weather-label">Feels Like</p>
            <p className="weather-value temp">{Math.round(weatherData.main.feels_like)}°C</p>
          </div>
          <div className="weather-item humidity">
            <Droplets className="weather-icon humidity" />
            <p className="weather-label">Humidity</p>
            <p className="weather-value humidity">{weatherData.main.humidity}%</p>
          </div>
          <div className="weather-item wind">
            <Wind className="weather-icon wind" />
            <p className="weather-label">Wind</p>
            <p className="weather-value wind">{weatherData.wind.speed}km/h</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Clima