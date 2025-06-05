import ClientScripts from '@/utils/ClientScripts';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
export default function Home() {
  return (
    <>
    <ClientScripts />
    <Header />
    
    <main>
       <section className="hero" id="home">
        <div className="container">
            <div className="hero__content">
                <h1>Descubre el mundo con TripTailor</h1>
                <p>Tu compañero de viajes personalizado con IA. Planifica, descubre y vive experiencias únicas adaptadas a tu estilo.</p>
                
                <div className="hero__search">
                    <input type="text" placeholder="¿A dónde quieres viajar?" id="searchInput" />
                    <button className="btn btn--primary">
                        🔍 Buscar destino
                    </button>
                </div>
            </div>
        </div>
      </section>


      <section className="section features">
          <div className="container">
              <div className="section__header">
                  <h2>¿Por qué elegir TripTailor?</h2>
                  <p>Descubre todas las funcionalidades que hacen de TripTailor tu mejor compañero de viajes</p>
              </div>
              
              <div className="features__grid">
                  <div className="features__item">
                      <div className="icon">🗺️</div>
                      <h3>Información completa</h3>
                      <p>Datos generales, clima, gastronomía y curiosidades culturales de cada destino</p>
                  </div>
                  
                  <div className="features__item">
                      <div className="icon">🤖</div>
                      <h3>Planificación con IA</h3>
                      <p>Consejos personalizados sobre qué llevar, presupuesto y recomendaciones por temporada</p>
                  </div>
                  
                  <div className="features__item">
                      <div className="icon">💰</div>
                      <h3>Presupuesto inteligente</h3>
                      <p>Estimaciones precisas según tu estilo de viaje, duración y temporada</p>
                  </div>
                  
                  <div className="features__item">
                      <div className="icon">📱</div>
                      <h3>Área personal</h3>
                      <p>Guarda, edita y organiza todos tus viajes en un solo lugar</p>
                  </div>
                  
                  <div className="features__item">
                      <div className="icon">🍽️</div>
                      <h3>Gastronomía local</h3>
                      <p>Descubre los platos típicos y la cultura culinaria de cada destino</p>
                  </div>
                  
                  <div className="features__item">
                      <div className="icon">🌡️</div>
                      <h3>Clima y temporadas</h3>
                      <p>Información meteorológica actual y estacional para planificar mejor</p>
                  </div>
              </div>
          </div>
      </section>

      
      <section className="section" style={{background: "white"}}>
          <div className="container">
              <div className="section__header">
                  <h2>Destinos populares</h2>
                  <p>Explora algunos de los destinos más buscados por nuestros viajeros</p>
              </div>
              
              <div className="destination__grid">
                  <div className="card destination__card">
                      <div className="destination__card-image">
                          <div className="badge">Popular</div>
                      </div>
                      <div className="destination__card-content">
                          <h3>Tokio, Japón</h3>
                          <div className="meta">
                              <span>🌡️ 22°C</span>
                              <span>💰 €80/día</span>
                              <span>🗣️ Japonés</span>
                          </div>
                          <div className="tags">
                              <span className="tag">Cultura</span>
                              <span className="tag">Tecnología</span>
                              <span className="tag">Gastronomía</span>
                          </div>
                          <p>Descubre la fascinante mezcla entre tradición y modernidad en la capital japonesa.</p>
                      </div>
                  </div>
                  
                  <div className="card destination__card">
                      <div className="destination__card-image">
                          <div className="badge">Trending</div>
                      </div>
                      <div className="destination__card-content">
                          <h3>Santorini, Grecia</h3>
                          <div className="meta">
                              <span>🌡️ 28°C</span>
                              <span>💰 €65/día</span>
                              <span>🗣️ Griego</span>
                          </div>
                          <div className="tags">
                              <span className="tag">Playa</span>
                              <span className="tag">Romance</span>
                              <span className="tag">Historia</span>
                          </div>
                          <p>Vive la magia de las puestas de sol más espectaculares del Mediterráneo.</p>
                      </div>
                  </div>
                  
                  <div className="card destination__card">
                      <div className="destination__card-image">
                          <div className="badge">Aventura</div>
                      </div>
                      <div className="destination__card-content">
                          <h3>Cusco, Perú</h3>
                          <div className="meta">
                              <span>🌡️ 18°C</span>
                              <span>💰 €35/día</span>
                              <span>🗣️ Español</span>
                          </div>
                          <div className="tags">
                              <span className="tag">Historia</span>
                              <span className="tag">Aventura</span>
                              <span className="tag">Naturaleza</span>
                          </div>
                          <p>Puerta de entrada a Machu Picchu y corazón del antiguo imperio Inca.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

  
      <section className="section planner" id="planificador">
          <div className="container">
              <div className="section__header">
                  <h2>Planificador personalizado</h2>
                  <p>Deja que nuestra IA cree el plan de viaje perfecto para ti</p>
              </div>
              
              <form className="planner__form">
                  <div className="form-grid">
                      <div className="form-group">
                          <label htmlFor="destination">Destino</label>
                          <input type="text" id="destination" placeholder="ej. París, Francia" />
                      </div>
                      
                      <div className="form-group">
                          <label htmlFor="days">Días de viaje</label>
                          <select id="days">
                              <option>1-3 días</option>
                              <option>4-7 días</option>
                              <option>1-2 semanas</option>
                              <option>Más de 2 semanas</option>
                          </select>
                      </div>
                      
                      <div className="form-group">
                          <label htmlFor="style">Estilo de viaje</label>
                          <select id="style">
                              <option>Mochilero</option>
                              <option>Estándar</option>
                              <option>Confort</option>
                              <option>Lujo</option>
                              <option>Familia</option>
                          </select>
                      </div>
                      
                      <div className="form-group">
                          <label htmlFor="season">Temporada</label>
                          <select id="season">
                              <option>Primavera</option>
                              <option>Verano</option>
                              <option>Otoño</option>
                              <option>Invierno</option>
                          </select>
                      </div>
                      
                      <div className="form-group">
                          <label htmlFor="budget">Presupuesto aproximado</label>
                          <input type="text" id="budget" placeholder="ej. €1000" />
                      </div>
                      
                      <div className="form-group">
                          <label htmlFor="text"></label>
                      </div>
                      
                      <div className="form-group full-width">
                          <label htmlFor="notes">Notas adicionales</label>
                          <textarea id="notes" placeholder="Cuéntanos más sobre tu viaje ideal..."></textarea>
                      </div>
                  </div>
                  
                  <div >
                      <button type="submit" className="btn btn--primary">
                          🤖 Generar plan personalizado
                      </button>
                  </div>
              </form>
          </div>
      </section>

    
      <section className="section user-area" style={{background: "white"}}>
          <div className="container">
              <div className="section__header">
                  <h2>Tu área personal</h2>
                  <p>Gestiona todos tus viajes desde un solo lugar</p>
              </div>
              
              <div className="user-area__tabs">
                  <button className="tab active">Mis viajes</button>
                  <button className="tab">Favoritos</button>
                  <button className="tab">Historial</button>
              </div>
              
              <div className="user-area__content">
                  <div className="trip-list">
                      <div className="card trip-card">
                          <div className="trip-card__actions">
                              <button className="btn btn--edit">✏️</button>
                              <button className="btn btn--delete">🗑️</button>
                          </div>
                          <h3>Viaje a Roma</h3>
                          <div className="meta">
                              <span>📅 15-22 Mayo 2024</span>
                              <span>💰 €850</span>
                          </div>
                          <div className="tags">
                              <span className="tag">Historia</span>
                              <span className="tag">Arte</span>
                          </div>
                          <p>Una semana explorando la ciudad eterna con enfoque en historia y gastronomía.</p>
                      </div>
                      
                      <div className="card trip-card">
                          <div className="trip-card__actions">
                              <button className="btn btn--edit">✏️</button>
                              <button className="btn btn--delete">🗑️</button>
                          </div>
                          <h3>Aventura en Islandia</h3>
                          <div className="meta">
                              <span>📅 10-20 Junio 2024</span>
                              <span>💰 €1200</span>
                          </div>
                          <div className="tags">
                              <span className="tag">Naturaleza</span>
                              <span className="tag">Aventura</span>
                          </div>
                          <p>Ruta por la isla de hielo y fuego, auroras boreales y paisajes únicos.</p>
                      </div>
                      
                      <div className="card trip-card">
                          <div className="trip-card__actions">
                              <button className="btn btn--edit">✏️</button>
                              <button className="btn btn--delete">🗑️</button>
                          </div>
                          <h3>Tokio Express</h3>
                          <div className="meta">
                              <span>📅 5-12 Agosto 2024</span>
                              <span>💰 €1500</span>
                          </div>
                          <div className="tags">
                              <span className="tag">Cultura</span>
                              <span className="tag">Tecnología</span>
                          </div>
                          <p>Inmersión total en la cultura japonesa moderna y tradicional.</p>
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
