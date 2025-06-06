'use client';

import { useEffect, useState } from 'react';
import { getAIPrompt } from "@/utils/getAiPrompt";

export default function Curiosity({ place }: { place: string }) {
  const [curiosity, setCuriosity] = useState<string | null>(null);

  useEffect(() => {
    const fetchCuriosity = async () => {
      const prompt = `Tell me one fun fact about ${place} in one short sentence.`;
      const result = await getAIPrompt(prompt);
      setCuriosity(result);
    };

    fetchCuriosity();
  }, [place]);

  return (
    curiosity ? (
       <span>{curiosity}</span>
    ) : (
      <span>Descubre la magia de {place} </span>
    )
  );
}
