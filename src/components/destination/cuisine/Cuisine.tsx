import React from 'react';

type CuisineData = {
  title: string;
  image?: string;
  extract: string;
};

type CuisineProps = {
  cuisineData?: CuisineData | null;
};

function Cuisine({ cuisineData }: CuisineProps) {
  if (!cuisineData) {
    return null; 
  }

  return (
    <div className="gastronomy-section">
      <h2>{cuisineData.title}</h2>
      <div className="food-grid">
        <div className="food-card">
          <div className="food-image">
            {cuisineData.image && (
              <img
                src={cuisineData.image}
                alt={cuisineData.title}
                className="rounded mb-4 w-full h-auto object-cover"
              />
            )}
          </div>
          <div className="food-content">
            <p>{cuisineData.extract}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cuisine