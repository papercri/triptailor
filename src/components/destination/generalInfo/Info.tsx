import React from 'react';
import { MapPin } from "lucide-react"
type InfoProps = {
  countryData: {
    region: string;
    capital: string[];
    population: number;
    area: number;
    idd: {
      root: string;
      suffixes: string[];
    };
    tld: string[];
    car: {
      side: string;
    };
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
          {countryData?.capital && (
            <div className="info-item">
            <span className="info-label">Capital:</span>
            <p className="info-value">{countryData.capital?.join(', ')}</p>
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
          {countryData?.idd && (
            <div className="info-item">
            <span className="info-label">Country Code:</span>
            <p className="info-value">{countryData.idd.root}{countryData.idd.suffixes?.join(', ')}</p>
          </div>
          )}
          {countryData?.tld && (
            <div className="info-item">
            <span className="info-label">Domain:</span>
            <p className="info-value">{countryData.tld?.join(', ')}</p>
          </div>
          )}
         {countryData && (
            <div className="info-item">
            <span className="info-label">Driving Side:</span>
            <p className="info-value">{countryData.car?.side}</p>
          </div>
          )}
         
          
          
        </div>
      </div>

    </div>
  );
}

export default Info;
