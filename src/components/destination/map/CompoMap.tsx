import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/components/ui/Spinner/Spinner';
import { MapPin} from "lucide-react"
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
    <div className="card">
      <div className="card-header location">
        <MapPin className="icon" />
        <h2 className="card-title">Location</h2>
      </div>
      <div className="map-container">
   
          {isClient ? (
            <Map lat={lat} lng={lng} place={place} />
          ) : (
            <p><Spinner /></p>
          )}
 
      </div>
    </div>
  );
}

export default CompoMap;
