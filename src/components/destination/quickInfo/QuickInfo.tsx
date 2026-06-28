import React from 'react'
import {  Currency, WeatherData, CountryData} from '@/types/destinationProps';
import { Thermometer, Globe, HandCoins, Clock } from "lucide-react"

type QuickInfoProps = {
  countryData: CountryData | null;
  weatherData: WeatherData;
  timeZone: string;
};

function QuickInfo({ 
    weatherData, 
    countryData, 
    timeZone }: QuickInfoProps) {
        console.log(countryData)
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
                    {(countryData?.languages?.length ?? 0) > 0
                        ? countryData!.languages.map((lang) => lang.native_name).join(', ')
                        : 'No data'}
                </span>
                </div>
            </div>

            <div className="quick-info__item">
                <div className="icon"><HandCoins /></div>
                <div className="content">
                <span className="label">Currency</span>
                <span className="value">
                    {(countryData?.currencies?.length ?? 0) > 0
                    ? countryData!.currencies.map((c: Currency) => `${c.name} (${c.symbol})`).join(', ')
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
