import React, {  useState } from 'react';
import {  CuisineData } from '@/types/destinationProps';
import { CircleEllipsis, CircleChevronUp} from 'lucide-react';

type CuisineProps = {
  cuisineData?: CuisineData;
};

function Cuisine({ cuisineData }: CuisineProps) {
  const [expanded, setExpanded] = useState(false);  
  if (!cuisineData) {
    return null; 
  }
  return (
    <div className="content-card">
      <div className="content-header">
        <h2 className="content-title">{cuisineData.title}</h2>
      </div>
      <div className="content-body">

          <div className="culture-image">
            {cuisineData.image && (
              <img
                src={cuisineData.image}
                alt={cuisineData.title}
                className="content-image"
              />
            )}

          </div>


          <p className={`content-text ${expanded ? 'expanded' : ''}`}>
            {cuisineData.extract}
          </p>
          <button
            className="read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <CircleChevronUp /> : <CircleEllipsis />}
          </button>
      </div>
    </div>

  )
}

export default Cuisine