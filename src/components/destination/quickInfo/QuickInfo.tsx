import React from 'react'
import {  Currency, WeatherData, CountryData} from '@/types/destinationProps';


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
                        <div className="icon">🌡️</div>
                        <div className="content">
                            <span className="label">Temperatura</span>
                            <span className="value">{Math.round(weatherData.main.temp)}°C
                                
                            </span>
                        </div>
                    </div>
             
                    <div className="quick-info__item">
                        <div className="icon">🗣️</div>
                        <div className="content">
                            <span className="label">Idioma</span>
                            <span className="value">
                                 {countryData.languages
                                ? Object.values(countryData.languages).join(', ')
                                : 'No data'}
                            </span>
                        </div>
                    </div>
                    <div className="quick-info__item">
                        <div className="icon">💴</div>
                        <div className="content">
                            <span className="label">Moneda</span>
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
                        <div className="icon">⏰</div>
                        <div className="content">
                            <span className="label">Zona horaria</span>
                            <span className="value">{timeZone} </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default QuickInfo