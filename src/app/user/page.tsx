

function page() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  return (
    <main>
     <section className="section user-area" style={{background: "white"}}>
          <div className="container">
              <div className="header">
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
  )
}

export default page