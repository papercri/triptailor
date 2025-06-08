import React from 'react';

type CultureData = {
  title: string;
  extract: string;
};

type CultureProps = {
  cultureData?: CultureData | null;
};

function Culture({ cultureData }: CultureProps) {
  if (!cultureData) {
    return null; // o algún mensaje/loading si quieres
  }

  return (
    <div className="culture-section">
      <h2>{cultureData.title}</h2>
      <div className="culture-cards">
        <div className="culture-card">
          <p>{cultureData.extract}</p>
        </div>
      </div>
    </div>
  );
}

export default Culture;
