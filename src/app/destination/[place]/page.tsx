import '@/styles/destination.scss'
import Map from '@/components/map/Map';
import { notFound } from 'next/navigation';
import { getCoordinatesWithTranslation } from '@/utils/geoCordTranslatorHelper';
import { getCountryData } from '@/utils/getCountryData';
// import Curiosity from '@/components/curiosity/Curiosity';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import DestinationHero from '@/components/destination/hero/DestinationHero';
import QuickInfo from '@/components/destination/quickInfo/QuickInfo';
import { getTimeZone } from '@/utils/getTimeZone';
import { translatePlaceName } from '@/utils/translatePlaces';
import { getWeather } from '@/utils/getWeather';
import { getCuisineInfo } from '@/utils/getCuisineInfo';
import { getCultureInfo } from '@/utils/getCultureInfo';


type Props = {
  params: { place: string };
};

type CoordinatesWithAddress = {
  lat: number;
  lng: number;
  displayName: string;
  address?: {
    country?: string;
    [key: string]: unknown;
  };
};

function extractCountryFromDisplayName(displayName: string, fallback: string): string {
  const parts = displayName.split(', ');
  return parts[parts.length - 1] || fallback;
}

export default async function DestinationPage({ params }: Props) {
    const place = decodeURIComponent(params.place);
    const coords = await getCoordinatesWithTranslation(place);
    if (!coords || !coords.displayName) notFound();

    const coordsWithAddress = coords as CoordinatesWithAddress;
    const countryName = coordsWithAddress.address?.country || extractCountryFromDisplayName(coords.displayName, place);
    const countryData = await getCountryData(countryName);
    const timeZone = await getTimeZone(coords.lat, coords.lng);
    const weatherData = await getWeather(coords.lat, coords.lng);
    if (!countryData || !countryData.name?.common) {
    notFound();
    }
    const parts = coords.displayName.split(', ');
    const cityName = translatePlaceName(parts[0]);
    const countryNameFromDisplay = translatePlaceName(parts[parts.length - 1]);
    const breadcrumbDisplay = `${cityName}, ${countryNameFromDisplay}`;
    const countryCommonName = countryData.name.common;
    const cuisineData = await getCuisineInfo(countryNameFromDisplay);
    const cultureData = await getCultureInfo(countryNameFromDisplay);
  
  return (
    <>
    <Header />
     <main className="destination-detail">
        <DestinationHero 
            countryData={countryData} 
            breadcrumbDisplay={breadcrumbDisplay} 
            countryCommonName={countryCommonName}
            cityName={cityName}
        />
        <QuickInfo
            weatherData={weatherData}
            countryData={countryData}
            timeZone={timeZone}
        />
      
        <section className="destination-content">
            <div className="container">
                <div className="content-grid">
                    <div className="content-main">
                        <div className="info-section">
                            <h2>Información general</h2>
                            <div className="info-grid">
                                <div className="info-card">
                                    <h3>Datos básicos</h3>
                                    <ul className="info-list">
                                        <li><strong>Continente:</strong> {countryData.region}</li>
                                        <li><strong>País:</strong> {countryCommonName}</li>
                                        <li><strong>Capital:</strong> {countryData.capital}</li>
                                        <li><strong>Población:</strong>  {countryData.population} </li>
                                        <li><strong>Superficie:</strong> {countryData.area} km²</li>
                                        <li><strong>Código país:</strong> {countryData.idd.root}{countryData.idd.suffixes}</li>
                                        <li><strong>Dominio:</strong> 
                                        {countryData.tld}
                                        </li>
                                        <li><strong>Conducción:</strong> {countryData.car.side}</li>
                                        
                                    </ul>
                                </div>
                                <div className="info-card">
                                    <h3>Clima y meteorología</h3>
                                    <ul className="info-list">
    
                           
                                <div className="current-weather">
                                    <div className="weather-main">
                                        <div className="weather-icon">
                                            <img
                                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                            alt={weatherData.weather[0].description}
                                            className="w-16 h-16"
                                            />
                                        </div>
                                        <div className="weather-temp">{Math.round(weatherData.main.temp)}°C

                                        </div>
                                        <div className="weather-desc">{weatherData.weather[0].description}</div>
                                    </div>
                                    <div className="weather-details">
                                        <div className="weather-detail">
                                            <span className="label">Sensación térmica</span>
                                            <span className="value">{Math.round(weatherData.main.feels_like)}°C</span>
                                        </div>
                                        <div className="weather-detail">
                                            <span className="label">Humedad</span>
                                            <span className="value">{weatherData.main.humidity}%</span>
                                        </div>
                                        <div className="weather-detail">
                                            <span className="label">Viento</span>
                                            <span className="value">{weatherData.wind.speed}km/h</span>
                                        </div>
                                        
                                    </div>
                                </div>
                             
                                
                   
                     
                                      
                                    </ul>
                                </div>
                                <div className='info-card'>
                                    <h3>Ubicación</h3>
                                    <div className="map-placeholder">
                                        <div className="map-content">
                            
                                            <p className='w-[300px] '></p>
                                            <small>   
                                            <Map lat={coords.lat} lng={coords.lng} place={coords.displayName} />
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="info-section">
                            <div className="info-grid info-grid__2col">
                                {cuisineData ? (
                                    <div className="gastronomy-section">
                                        <h2>{cuisineData.title}</h2>
                                        <div className="food-grid">
                                            <div className="food-card">
                                                <div className="food-image">
                                                    {cuisineData.image && (
                                                        <img src={cuisineData.image} alt={cuisineData.title} className="rounded mb-4 w-full h-auto object-cover" />
                                                    )}
                                                </div>
                                                <div className="food-content">
                                                
                                                    <p>{cuisineData.extract}</p>
                                                    
                                                </div>
                                            </div>
                    
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                    )}
                                {cultureData ? (    
                                    <div className="culture-section">
                                        <h2>{cultureData.title}</h2>
                                        <div className="culture-cards">
                                            <div className="culture-card">
                
                                
                                                <p>{cultureData.extract}</p>
                                            </div>
                            
                                        </div>
                                    </div>
                                ) : (
                                <div></div>
                                )}
                            </div>  
                        </div>
                  

                   
                    </div>


                </div>
            </div>
        </section>
    </main>
    <Footer />
  </>

  );
}
