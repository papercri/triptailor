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
                            </div>
                        </div>

                  
                        <div className="map-section">
                            <h2>Ubicación</h2>
                            <div className="map-container">
                                <div className="map-placeholder">
                                    <div className="map-content">
                                        <div className="map-icon">🗺️</div>
                                        <p>Mapa interactivo de {coords.displayName}</p>
                                        <small>   
                                          <Map lat={coords.lat} lng={coords.lng} place={coords.displayName} />
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>



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

{/*                    
                    <div className="content-sidebar">
                
                        <div className="sidebar-section">
                            <h3>💰 Calculadora de presupuesto</h3>
                            <form className="budget-form">
                                <div className="form-group">
                                    <label htmlFor="days">Días de viaje</label>
                                    <input type="number" id="days" min="1" max="30" value="7" />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="style">Estilo de viaje</label>
                                    <select id="style">
                                        <option value="budget">Mochilero (€30-50/día)</option>
                                        <option value="mid" selected>Estándar (€80-120/día)</option>
                                        <option value="luxury">Lujo (€200+/día)</option>
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="season">Temporada</label>
                                    <select id="season">
                                        <option value="spring">Primavera</option>
                                        <option value="summer">Verano</option>
                                        <option value="autumn" selected>Otoño</option>
                                        <option value="winter">Invierno</option>
                                    </select>
                                </div>
                                
                                <button type="submit" className="btn btn--primary btn--full">
                                    🤖 Calcular presupuesto
                                </button>
                                
                                <div className="budget-result">
                                    <div className="budget-total">
                                        <span className="label">Presupuesto estimado:</span>
                                        <span className="amount">€700 - €840</span>
                                    </div>
                                    <div className="budget-breakdown">
                                        <div className="budget-item">
                                            <span>Alojamiento</span>
                                            <span>€350</span>
                                        </div>
                                        <div className="budget-item">
                                            <span>Comida</span>
                                            <span>€210</span>
                                        </div>
                                        <div className="budget-item">
                                            <span>Transporte</span>
                                            <span>€140</span>
                                        </div>
                                        <div className="budget-item">
                                            <span>Actividades</span>
                                            <span>€140</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

       
                        <div className="sidebar-section">
                            <h3>🎒 Lista de maleta inteligente</h3>
                            <form className="packing-form">
                                <div className="form-group">
                                    <label htmlFor="duration">Duración</label>
                                    <select id="duration">
                                        <option value="weekend">Fin de semana</option>
                                        <option value="week" selected>1 semana</option>
                                        <option value="twoweeks">2 semanas</option>
                                        <option value="month">1 mes</option>
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="activities">Actividades planeadas</label>
                                    <div className="checkbox-group">
                                        <label className="checkbox-item">
                                            <input type="checkbox" value="sightseeing" checked />
                                            <span>Turismo urbano</span>
                                        </label>
                                        <label className="checkbox-item">
                                            <input type="checkbox" value="temples" />
                                            <span>Visita a templos</span>
                                        </label>
                                        <label className="checkbox-item">
                                            <input type="checkbox" value="business" />
                                            <span>Reuniones de trabajo</span>
                                        </label>
                                        <label className="checkbox-item">
                                            <input type="checkbox" value="nightlife" />
                                            <span>Vida nocturna</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <button type="submit" className="btn btn--secondary btn--full">
                                    🤖 Generar lista
                                </button>
                                
                                <div className="packing-result">
                                    <div className="packing-category">
                                        <h4>👕 Ropa</h4>
                                        <ul>
                                            <li>7 camisetas/blusas</li>
                                            <li>2 pantalones largos</li>
                                            <li>1 chaqueta ligera</li>
                                            <li>Ropa interior (8 días)</li>
                                            <li>Calcetines (8 pares)</li>
                                        </ul>
                                    </div>
                                    <div className="packing-category">
                                        <h4>🔌 Electrónicos</h4>
                                        <ul>
                                            <li>Adaptador tipo A/B</li>
                                            <li>Cargador de móvil</li>
                                            <li>Power bank</li>
                                            <li>Cámara</li>
                                        </ul>
                                    </div>
                                    <div className="packing-category">
                                        <h4>💊 Salud</h4>
                                        <ul>
                                            <li>Medicamentos personales</li>
                                            <li>Protector solar</li>
                                            <li>Repelente de insectos</li>
                                            <li>Botiquín básico</li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </div>

               
                        <div className="sidebar-section">
                            <h3>🤖 Consejos de IA</h3>
                            <div className="ai-tips">
                                <div className="ai-tip">
                                    <div className="tip-icon">💡</div>
                                    <div className="tip-content">
                                        <h4>Mejor época para viajar</h4>
                                        <p>Abril-mayo y octubre-noviembre ofrecen el mejor clima y menos multitudes.</p>
                                    </div>
                                </div>
                                <div className="ai-tip">
                                    <div className="tip-icon">💳</div>
                                    <div className="tip-content">
                                        <h4>Dinero en efectivo</h4>
                                        <p>Japón sigue siendo una sociedad de efectivo. Lleva yenes para pequeños comercios.</p>
                                    </div>
                                </div>
                                <div className="ai-tip">
                                    <div className="tip-icon">🚇</div>
                                    <div className="tip-content">
                                        <h4>JR Pass</h4>
                                        <p>Si planeas viajar entre ciudades, el JR Pass puede ahorrarte mucho dinero.</p>
                                    </div>
                                </div>
                                <div className="ai-tip">
                                    <div className="tip-icon">📱</div>
                                    <div className="tip-content">
                                        <h4>Apps esenciales</h4>
                                        <p>Descarga Google Translate con cámara y Hyperdia para horarios de trenes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    </main>
    <Footer />
  </>

  );
}
