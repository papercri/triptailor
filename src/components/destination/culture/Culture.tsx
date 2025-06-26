import React, { useEffect, useState } from 'react';
import { getCountryBackgroundPhoto } from '@/services/getCountryBackgroundPhoto';
import {  CultureData } from '@/types/destinationProps';
import { CircleEllipsis, CircleChevronUp} from 'lucide-react';
type CultureProps = {
  cultureData?: CultureData;
  countryCommonName: string;
};

function Culture({ cultureData, countryCommonName }: CultureProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    <div className="content-card">
      <div className="content-header">
        <h2 className="content-title">{cultureData.title}</h2>
      </div>
      <div className="content-body">

          <div className="culture-image">
            {hasMounted && imageUrl ? (
              <img
                src={imageUrl}
                alt={cultureData.title}
                className="content-image"
              />
            ) : (
   
              <div className="content-image bg-gray-200 " aria-hidden="true" />
            )}
          </div>
          <p className={`content-text ${expanded ? 'expanded' : ''}`}>
            {cultureData.extract}
          </p>
          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <CircleChevronUp /> : <CircleEllipsis />}
          </button>
      </div>
    </div>
  );
}

export default Culture;
