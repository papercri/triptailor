'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const images = [
  '/images/bg1.webp',
  '/images/bg2.webp',
  '/images/bg3.webp',
];

export default function HeroCarousel() {
  const [place, setPlace] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!place.trim()) return;
    router.push(`/destination/${encodeURIComponent(place)}`);
  };
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); // cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>


      <div className="hero__content">
          <h1>Discover the world with TripTailor</h1>
          <p>Your AI-powered travel companion. Plan, discover, and experience unique journeys tailored to your style.</p>

          <form onSubmit={handleSubmit} className="hero__search">
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Where do you want to travel?"
              className="border rounded p-2 w-full"
            />
            <button type="submit" className="btn btn--primary">
              <Search /> Search destination
            </button>
          </form>
        </div>
      <div className="absolute inset-0 bg-black/40 z-0" />
    </div>
  );
}
