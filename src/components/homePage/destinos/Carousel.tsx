'use client';

import Slider from 'react-slick';
import CityCard from './CityCard';
import { useCities } from '@/hooks/useCities';
import { PrevArrow, NextArrow } from './Arrows';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from '@/components/ui/Spinner/Spinner';

export default function CityCarousel() {
  const { cities, loading } = useCities();

  if (loading) {
    return <p className="text-center"><Spinner /></p>;
  }

  // Mezclar y seleccionar 5 aleatorias solo si hay datos
  const shuffled = [...cities].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Explore Top Cities</h2>
      <Slider {...settings}>
        {selected.map((city) => (
          <div key={city.slug} className="px-2">
            <CityCard name={city.name} slug={city.slug} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
