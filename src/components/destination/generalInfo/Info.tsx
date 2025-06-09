import React from 'react';

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
    <div className="info-card">
      <h3>Basic Information</h3>
      <ul className="info-list">
        <li><strong>Continent:</strong> {countryData.region}</li>
        <li><strong>Country:</strong> {countryCommonName}</li>
        <li><strong>Capital:</strong> {countryData.capital?.join(', ')}</li>
        <li><strong>Population:</strong> {countryData.population.toLocaleString()}</li>
        <li><strong>Area:</strong> {countryData.area.toLocaleString()} km²</li>
        <li>
          <strong>Country Code:</strong> {countryData.idd.root}{countryData.idd.suffixes?.join(', ')}
        </li>
        <li><strong>Domain:</strong> {countryData.tld?.join(', ')}</li>
        <li><strong>Driving Side:</strong> {countryData.car.side}</li>
      </ul>
    </div>
  );
}

export default Info;
