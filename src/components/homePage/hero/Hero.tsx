'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [place, setPlace] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //const isValidPlace = /^[a-zA-Z0-9\s,-]+$/.test(place);
    if (!place.trim()) return;
    router.push(`/destination/${encodeURIComponent(place)}`);
  };

  return (
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
  )
}
