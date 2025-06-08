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
      <h3>Datos básicos</h3>
      <ul className="info-list">
        <li><strong>Continente:</strong> {countryData.region}</li>
        <li><strong>País:</strong> {countryCommonName}</li>
        <li><strong>Capital:</strong> {countryData.capital?.join(', ')}</li>
        <li><strong>Población:</strong> {countryData.population.toLocaleString()}</li>
        <li><strong>Superficie:</strong> {countryData.area.toLocaleString()} km²</li>
        <li>
          <strong>Código país:</strong> {countryData.idd.root}{countryData.idd.suffixes?.join(', ')}
        </li>
        <li><strong>Dominio:</strong> {countryData.tld?.join(', ')}</li>
        <li><strong>Conducción:</strong> {countryData.car.side}</li>
      </ul>
    </div>
  );
}

export default Info;
