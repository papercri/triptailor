import React from 'react';
import { MapPin } from "lucide-react"

type InfoProps = {
  countryData: {
    region: string;
    capital: string[];
    population: number;
    area: number;
    callingCodes: string[];
    tld: string[];
    car: {
      side: string;
    };
    government_type: string[];
  };
  countryCommonName: string;
};

function Info({ countryData, countryCommonName }: InfoProps) {
  return (
    <div className="card">
      <div className="card-header">
        <MapPin className="icon" />
        <h2 className="card-title">Basic Info</h2>
      </div>
      <div className="card-content">
        <div className="info-details">
          {countryData?.region && (
            <div className="info-item">
            <span className="info-label">Continent:</span>
            <p className="info-value">{countryData.region}</p>
            </div>
          )}

          <div className="info-item">
            <span className="info-label">Country:</span>
            <p className="info-value">{countryCommonName}</p>
          </div>
          {countryData?.capital?.length > 0 && (
            <div className="info-item">
            <span className="info-label">Capital:</span>
            <p className="info-value">{countryData.capital.join(', ')}</p>
          </div>
          )}
          {countryData?.population && (
           <div className="info-item">
            <span className="info-label">Population:</span>
            <p className="info-value">{countryData.population.toLocaleString()}</p>
          </div>
          )}
          {countryData?.area && (
           <div className="info-item">
            <span className="info-label">Area:</span>
            <p className="info-value">{countryData.area.toLocaleString()} km²</p>
          </div>
          )}
          {countryData?.callingCodes?.length > 0 && (
            <div className="info-item">
            <span className="info-label">Country Code:</span>
            <p className="info-value">{countryData.callingCodes.join(', ')}</p>
          </div>
          )}
          {countryData?.tld?.length > 0 && (
            <div className="info-item">
            <span className="info-label">Domain:</span>
            <p className="info-value">{countryData.tld.join(', ')}</p>
          </div>
          )}
         {countryData?.car?.side && (
            <div className="info-item">
            <span className="info-label">Driving Side:</span>
            <p className="info-value capitalize">{countryData.car.side}</p>
          </div>
          )}
          {countryData?.government_type?.length > 0 && (
            <div className="info-item">
            <span className="info-label">Government Type:</span>
            <p className="info-value">{countryData.government_type}</p>
          </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Info;
