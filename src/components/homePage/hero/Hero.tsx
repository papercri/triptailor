import React from 'react'

export default function Hero() {
  return (
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
  )
}
