import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

type MapProps = {
  lat: number;
  lng: number;
  place: string;
};

function CompoMap({ lat, lng, place }: MapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="info-card">
      <h3>Location</h3>
      <div className="map-placeholder">
        <div className="map-content">
          {isClient ? (
            <Map lat={lat} lng={lng} place={place} />
          ) : (
            <p>Loading map...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompoMap;
