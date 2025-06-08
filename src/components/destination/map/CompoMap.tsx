import React from 'react';
import Map from '@/components/map/Map';
type MapProps = {
  lat: number;
  lng: number;
  place: string;
};

function CompoMap({ lat, lng, place }: MapProps) {
  return (

    <div className='info-card'>
        <h3>Ubicación</h3>
        <div className="map-placeholder">
            <div className="map-content">
                <p className='w-[300px] '></p>
                <small>   
                <Map lat={lat} lng={lng} place={place} />
                </small>
            </div>
        </div>
    </div>
  )
}

export default CompoMap