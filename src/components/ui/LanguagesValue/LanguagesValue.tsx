'use client';

import React, { useState } from 'react';
import './LanguagesValue.css';
import { Language } from '@/types/destinationProps';
import { CircleEllipsis, CircleChevronUp} from 'lucide-react';

type LanguagesValueProps = {
  languages: Language[];
};

function LanguagesValue({ languages }: LanguagesValueProps) {
  const [expanded, setExpanded] = useState(false);

  if (!languages || languages.length === 0) {
    return <span className="value">No data</span>;
  }

  const names = languages.map((lang) => lang.native_name);
  const text = names.join(', ');

  if (names.length === 1) {
    return <span className="value">{text}</span>;
  }

  return (
    <span className={`value languages-value ${expanded ? 'is-expanded' : ''}`}>
      <span className="languages-text">{text}</span>
      <button
        type="button"
        className="languages-toggle"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? <CircleChevronUp /> : <CircleEllipsis />}
      </button>
    </span>
  );
}

export default LanguagesValue;
