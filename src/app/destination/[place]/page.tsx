
import Map from '@/components/map/Map';
import { getCoordinates } from '@/utils/geocode';
import { getCountryData } from '@/utils/getCountryData';
import Curiosity from '@/components/curiosity/Curiosity';
import Nav from '@/components/layout/nav/Nav';
import Footer from '@/components/layout/footer/Footer';
 import CountryBackgroundImage from '@/components/countryBackgroundImage/CountryBackgroundImage';   

type Props = {
  params: { place: string };
};

export default async function DestinationPage({ params }: Props) {
  const place = decodeURIComponent(params.place);
 
  const coords = await getCoordinates(place);
  if (!coords || !coords.displayName) return <p>Location not found</p>;
  const countryFull = coords.displayName;
  const countryName = countryFull.includes(", ") ? countryFull.split(", ")[1] : place;
  const countryData = await getCountryData(countryName);


  return (
    <>
  <header className='header'>
    <div className="container">
      <Nav />
    </div>
  </header>
     <main className="destination-detail">
        <section className="destination-hero">
            <div className="destination-hero__image !bg-transparent z-10 absolute">
                 <CountryBackgroundImage countryName={countryName} />
                <div className="destination-hero__overlay">
                    <div className="container">
                        <div className="destination-hero__content">
                            <div className="breadcrumb">
                                <a href="index.html">Inicio</a>
                                <span>›</span>
                                <a href="#destinos">Destinos</a>
                                <span>›</span>
                                <span>{coords.displayName}</span>
                            </div>
                            <div className='flex gap-5 items-center '>
                                 <div className='flag-container w-[50px] h-[50px] rounded-full overflow-hidden shadow-lg mb-5'>
                              
                                <img
                                    src={countryData.flags.svg}
                                    alt={`Flag of ${countryData.name.common}`}
                                    className="flag-image h-full object-cover relatve"
                                />
                                
                            </div>
                         
                            <h1 className="capitalize !mb-0 ">{coords.displayName} </h1>
                            </div>
                           
                            <p>
                                <Curiosity place={coords.displayName} />
                       </p>
                            <div className="destination-hero__actions">
                                <button className="btn btn--primary">💾 Guardar destino</button>
                                <button className="btn btn--secondary">📤 Compartir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <section className="quick-info">
            <div className="container">
                <div className="quick-info__grid">
                    <div className="quick-info__item">
                        <div className="icon">🌡️</div>
                        <div className="content">
                            <span className="label">Temperatura</span>
                            <span className="value">22°C</span>
                        </div>
                    </div>
                    {/* <div className="quick-info__item">
                        <div className="icon">💰</div>
                        <div className="content">
                            <span className="label">Presupuesto/día</span>
                            <span className="value">€80-120</span>
                        </div>
                    </div> */}
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
                                ? Object.values(countryData.currencies)
                                    .map((c: string) => `${c.name} (${c.symbol})`)
                                    .join(', ')
                                : 'No data'}
                            </span>
                        </div>
                    </div>
                    {/* <div className="quick-info__item">
                        <div className="icon">⏰</div>
                        <div className="content">
                            <span className="label">Zona horaria</span>
                            <span className="value">{countryData.timezones?.join(', ') || 'No data'} </span>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>

  
        <section className="destination-content">
            <div className="container">
                <div className="content-grid">
            
                    <div className="content-main">
               
                        <div className="info-section">
                            <h2>Información general</h2>
                            <div className="info-grid">
                                <div className="info-card">
                                    <h3>🏛️ Datos básicos</h3>
                                    <ul className="info-list">
                                        <li><strong>Continente:</strong> {countryData.region}</li>
                                        <li><strong>País:</strong> {countryData.name.common}</li>
                                        <li><strong>Capital:</strong> {countryData.capital}</li>
                                        <li><strong>Población:</strong>  {countryData.population} </li>
                                        <li><strong>Superficie:</strong> {countryData.area} km²</li>
                                        
                                    </ul>
                                </div>
                                <div className="info-card">
                                    <h3>🔌 Información práctica</h3>
                                    <ul className="info-list">
                                        
                                
                                        <li><strong>Código país:</strong> {countryData.idd.root}{countryData.idd.suffixes}</li>
                                        <li><strong>Dominio:</strong> 
                                        {countryData.tld}
                                        </li>
                                        <li><strong>Conducción:</strong> {countryData.car.side}</li>
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

                        <div className="weather-section">
                            <h2>Clima y meteorología</h2>
                            <div className="weather-tabs">
                                <button className="weather-tab active" data-tab="current">Actual</button>
                                <button className="weather-tab" data-tab="forecast">7 días</button>
                                <button className="weather-tab" data-tab="seasonal">Por temporada</button>
                            </div>
                            
                            <div className="weather-content">
                                <div className="weather-panel active" id="current">
                                    <div className="current-weather">
                                        <div className="weather-main">
                                            <div className="weather-icon">☀️</div>
                                            <div className="weather-temp">22°C</div>
                                            <div className="weather-desc">Soleado</div>
                                        </div>
                                        <div className="weather-details">
                                            <div className="weather-detail">
                                                <span className="label">Sensación térmica</span>
                                                <span className="value">25°C</span>
                                            </div>
                                            <div className="weather-detail">
                                                <span className="label">Humedad</span>
                                                <span className="value">65%</span>
                                            </div>
                                            <div className="weather-detail">
                                                <span className="label">Viento</span>
                                                <span className="value">12 km/h</span>
                                            </div>
                                            <div className="weather-detail">
                                                <span className="label">UV</span>
                                                <span className="value">Moderado</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="weather-panel" id="forecast">
                                    <div className="forecast-grid">
                                        <div className="forecast-day">
                                            <div className="day">Hoy</div>
                                            <div className="icon">☀️</div>
                                            <div className="temps">
                                                <span className="high">25°</span>
                                                <span className="low">18°</span>
                                            </div>
                                        </div>
                                        <div className="forecast-day">
                                            <div className="day">Mañana</div>
                                            <div className="icon">⛅</div>
                                            <div className="temps">
                                                <span className="high">23°</span>
                                                <span className="low">16°</span>
                                            </div>
                                        </div>
                                        <div className="forecast-day">
                                            <div className="day">Miércoles</div>
                                            <div className="icon">🌧️</div>
                                            <div className="temps">
                                                <span className="high">20°</span>
                                                <span className="low">15°</span>
                                            </div>
                                        </div>
                                        <div className="forecast-day">
                                            <div className="day">Jueves</div>
                                            <div className="icon">☀️</div>
                                            <div className="temps">
                                                <span className="high">26°</span>
                                                <span className="low">19°</span>
                                            </div>
                                        </div>
                                        <div className="forecast-day">
                                            <div className="day">Viernes</div>
                                            <div className="icon">⛅</div>
                                            <div className="temps">
                                                <span className="high">24°</span>
                                                <span className="low">17°</span>
                                            </div>
                                        </div>
                                        <div className="forecast-day">
                                            <div className="day">Sábado</div>
                                            <div className="icon">☀️</div>
                                            <div className="temps">
                                                <span className="high">27°</span>
                                                <span className="low">20°</span>
                                            </div>
                                        </div>
                                        <div className="forecast-day">
                                            <div className="day">Domingo</div>
                                            <div className="icon">🌤️</div>
                                            <div className="temps">
                                                <span className="high">25°</span>
                                                <span className="low">18°</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="weather-panel" id="seasonal">
                                    <div className="seasonal-grid">
                                        <div className="season-card">
                                            <h4>🌸 Primavera (Mar-May)</h4>
                                            <div className="season-temp">15-25°C</div>
                                            <p>Ideal para ver los cerezos en flor. Clima templado y agradable.</p>
                                        </div>
                                        <div className="season-card">
                                            <h4>☀️ Verano (Jun-Ago)</h4>
                                            <div className="season-temp">25-35°C</div>
                                            <p>Caluroso y húmedo. Temporada de festivales y fuegos artificiales.</p>
                                        </div>
                                        <div className="season-card">
                                            <h4>🍂 Otoño (Sep-Nov)</h4>
                                            <div className="season-temp">10-20°C</div>
                                            <p>Colores otoñales espectaculares. Clima fresco y seco.</p>
                                        </div>
                                        <div className="season-card">
                                            <h4>❄️ Invierno (Dec-Feb)</h4>
                                            <div className="season-temp">0-10°C</div>
                                            <p>Frío y seco. Pocas precipitaciones, cielos despejados.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

      
                        <div className="gastronomy-section">
                            <h2>Gastronomía local</h2>
                            <div className="food-grid">
                                <div className="food-card">
                                    <div className="food-image">🍣</div>
                                    <div className="food-content">
                                        <h3>Sushi</h3>
                                        <p>El arte culinario más refinado de Japón. Pescado fresco sobre arroz perfectamente sazonado.</p>
                                        <div className="food-price">€15-50</div>
                                    </div>
                                </div>
                                <div className="food-card">
                                    <div className="food-image">🍜</div>
                                    <div className="food-content">
                                        <h3>Ramen</h3>
                                        <p>Sopa de fideos con caldo rico y sabroso. Cada región tiene su estilo único.</p>
                                        <div className="food-price">€8-15</div>
                                    </div>
                                </div>
                                <div className="food-card">
                                    <div className="food-image">🥟</div>
                                    <div className="food-content">
                                        <h3>Gyoza</h3>
                                        <p>Empanadillas japonesas rellenas de carne y verduras, perfectamente doradas.</p>
                                        <div className="food-price">€5-10</div>
                                    </div>
                                </div>
                                <div className="food-card">
                                    <div className="food-image">🍱</div>
                                    <div className="food-content">
                                        <h3>Bento</h3>
                                        <p>Caja de comida tradicional con arroz, proteína y acompañamientos variados.</p>
                                        <div className="food-price">€6-12</div>
                                    </div>
                                </div>
                            </div>
                        </div>

             
                        <div className="culture-section">
                            <h2>Curiosidades culturales</h2>
                            <div className="culture-cards">
                                <div className="culture-card">
                                    <div className="culture-icon">🙇</div>
                                    <h3>Etiqueta del saludo</h3>
                                    <p>El saludo tradicional japonés es una reverencia. Cuanto más profunda, mayor respeto muestra.</p>
                                </div>
                                <div className="culture-card">
                                    <div className="culture-icon">👞</div>
                                    <h3>Quítate los zapatos</h3>
                                    <p>En casas, templos y algunos restaurantes tradicionales, siempre debes quitarte los zapatos.</p>
                                </div>
                                <div className="culture-card">
                                    <div className="culture-icon">🚇</div>
                                    <h3>Silencio en el transporte</h3>
                                    <p>En trenes y metros, hablar por teléfono o hacer ruido se considera de mala educación.</p>
                                </div>
                                <div className="culture-card">
                                    <div className="culture-icon">🎁</div>
                                    <h3>Arte del regalo</h3>
                                    <p>Los regalos se envuelven cuidadosamente y se entregan con ambas manos como muestra de respeto.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                   
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
                    </div>
                </div>
            </div>
        </section>
    </main>
    <Footer />
  </>

  );
}
