import React from 'react'
import {  Currency, WeatherData, CountryData} from '@/types/destinationProps';
import { Thermometer, Globe, HandCoins, Clock } from "lucide-react"


type QuickInfoProps = {
  countryData: CountryData;
  weatherData: WeatherData;
  timeZone: string;
};


function QuickInfo({ weatherData, countryData, timeZone }: QuickInfoProps) {
  return (
    <section className="quick-info">
        <div className="container">
            <div className="quick-info__grid">
            <div className="quick-info__item">
                <div className="icon"><Thermometer /></div>
                <div className="content">
                <span className="label">Temperature</span>
                <span className="value">{Math.round(weatherData.main.temp)}°C</span>
                </div>
            </div>

            <div className="quick-info__item">
                <div className="icon"><Globe /></div>
                <div className="content">
                <span className="label">Language</span>
                <span className="value">
                    {countryData.languages
                    ? Object.values(countryData.languages).join(', ')
                    : 'No data'}
                </span>
                </div>
            </div>

            <div className="quick-info__item">
                <div className="icon"><HandCoins /></div>
                <div className="content">
                <span className="label">Currency</span>
                <span className="value">
                    {countryData.currencies
                    ? (Object.values(countryData.currencies) as Currency[])
                        .map((c) => `${c.name} (${c.symbol})`)
                        .join(', ')
                    : 'No data'}
                </span>
                </div>
            </div>

            <div className="quick-info__item">
                <div className="icon"><Clock /></div>
                <div className="content">
                <span className="label">Time Zone</span>
                <span className="value">{timeZone}</span>
                </div>
            </div>
            </div>
        </div>
    </section>

  )
}

export default QuickInfo