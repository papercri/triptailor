'use client';

import React, { useState } from 'react';
import './ExpandableValue.scss';
import { CircleEllipsis, CircleChevronUp } from 'lucide-react';

type ExpandableValueProps = {
  items: string[];
};

function ExpandableValue({ items }: ExpandableValueProps) {
  const [expanded, setExpanded] = useState(false);

  if (!items || items.length === 0) {
    return <span className="value">No data</span>;
  }

  if (items.length === 1) {
    return <span className="value">{items[0]}</span>;
  }

  // Mostramos siempre items completos (nunca una palabra a medio cortar).
  // Colapsado: el primer item + cuántos quedan ocultos.
  // Expandido: la lista completa.
  const collapsedText = items[0];
  const hiddenCount = items.length - 1;

  return (
    <span className={`value expandable-value ${expanded ? 'is-expanded' : ''}`}>
      <span className="expandable-text">
        {expanded ? items.join(', ') : `${collapsedText} +${hiddenCount}`}
      </span>
      <button
        type="button"
        className="expandable-toggle"
        onClick={() => setExpanded((prev) => !prev)}
        aria-label={expanded ? 'See less' : 'See more'}
      >
        {expanded ? <CircleChevronUp /> : <CircleEllipsis />}
      </button>
    </span>
  );
}

export default ExpandableValue;
