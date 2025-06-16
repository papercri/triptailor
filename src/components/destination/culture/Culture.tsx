import React, { useEffect, useState } from 'react';
import { getCountryBackgroundPhoto } from '@/services/getCountryBackgroundPhoto';
import {  CultureData } from '@/types/destinationProps';

type CultureProps = {
  cultureData?: CultureData;
  countryCommonName: string;
};

function Culture({ cultureData, countryCommonName }: CultureProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    getCountryBackgroundPhoto(countryCommonName).then((url) => {
      if (url) setImageUrl(url);
    });
  }, [countryCommonName, hasMounted]);

  if (!cultureData) {
    return null;
  }

  return (
    <div className="culture-section">
      <h2>{cultureData.title}</h2>
      <div className="culture-cards">
        <div className="culture-card">
          <div className="culture-image">
            {hasMounted && imageUrl ? (
              <img
                src={imageUrl}
                alt={cultureData.title}
                className="rounded mb-4 w-full h-auto object-cover"
              />
            ) : (
              // placeholder mientras carga o en SSR
              <div className="w-full h-48 bg-gray-200 rounded mb-4" aria-hidden="true" />
            )}
          </div>
          <div className="culture-content">
            <p>{cultureData.extract}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Culture;
