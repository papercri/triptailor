'use client';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDestinationSearch } from '@/hooks/useDestinationSearch';
const images = [
  '/images/bg1.webp',
  '/images/bg2.webp',
  '/images/bg3.webp',
];

export default function Hero() {
  const {
    place,
    handleChange,
    handleSubmit,
  } = useDestinationSearch();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero relative h-screen overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center z-50"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>
      <div className="container relative z-100">
        <div className="hero__content">
          <h1>Discover the world with TripTailor</h1>
          <p className="text-xl">
            Your AI-powered travel companion. Plan, discover, and experience unique journeys tailored to your style.
          </p>

          <form onSubmit={handleSubmit} className="hero__search">
            <input
              type="text"
              value={place}
              onChange={handleChange}
              placeholder="Where do you want to travel?"
              className="border rounded p-2 w-full"
            />
            <button type="submit" className="btn btn--primary">
              <Search size={18} /> Search destination
            </button>
          </form>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/30 z-70" />
    </section>
  );
}
