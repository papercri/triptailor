'use client';

import { useEffect, useState } from 'react';
import { getCountryBackgroundPhoto } from '@/services/getCountryBackgroundPhoto';

type Props = {
  cityName: string;
};

export default function CountryBackgroundImage({ cityName }: Props) {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    getCountryBackgroundPhoto(cityName).then((url) => {
      if (url) setBgImage(url);
    });
  }, [cityName, hasMounted]);

  if (!hasMounted) {
    return <div className="absolute inset-0 w-full h-full bg-gray-200" aria-hidden="true" />;
  }

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
        transition: 'background-image 0.5s ease-in-out',
      }}
      aria-label={`Background image representing ${cityName}`}
      role="img"
    />
  );
}