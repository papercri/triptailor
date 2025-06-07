'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import About from '@/components/homePage/about/About';
import Destinos from '@/components/homePage/destinos/Destinos';
import Planificador from '@/components/homePage/planificador/Planificador';
export default function Home() {
  const [place, setPlace] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!place) return;
    router.push(`/destination/${encodeURIComponent(place)}`);
  };
 
  return (
    <>
    <Header />
    
    <main>
    <div id="home"></div>
    <section className="hero" >
        <div className="container">
            <div className="hero__content">
                <h1>Descubre el mundo con TripTailor</h1>
                <p>Tu compañero de viajes personalizado con IA. Planifica, descubre y vive experiencias únicas adaptadas a tu estilo.</p>
                
                <form onSubmit={handleSubmit} className="hero__search">
                    <input
                        type="text"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        placeholder="¿A dónde quieres viajar?"
                        className="border rounded p-2 w-full"
                    />
                    <button type="submit" className="btn btn--primary">
                        🔍 Buscar destino
                    </button>
                </form>

            </div>
        </div>
    </section>

    <div id="sobre-nosotros"></div>
    <About />
    <div id="destinos"></div>
    <Destinos />
    <div id="planificador"></div>
     <Planificador />

    </main>

  
    <Footer />
   
    </>
 
  );
}
