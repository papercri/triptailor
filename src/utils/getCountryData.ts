// This file contains a mapping of country names to their common names in various languages
// The data is used to normalize country names for API requests and display purposes
// The translations are in the format: { "originalName": "translatedName" }
// The translations are used to ensure consistent naming across different languages and scripts

import placeTranslations from '@/data/placeTranslations.json';

const countryNameMap = placeTranslations as Record<string, string>;

function normalizeCountryName(name: string): string {
  const trimmed = name.trim();
  const latinMatch = trimmed.match(/^[a-zA-Z\s\-,]+/);
  if (latinMatch) {
    const latinName = latinMatch[0].trim();
    if (latinName) return latinName;
  }

  // Si no, usa el nombre completo
  return trimmed;
}
export async function getCountryData(countryName: string) {
  try {
    const cleanedName = normalizeCountryName(countryName);
    const normalizedCountryName = countryNameMap[cleanedName] || cleanedName;

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(normalizedCountryName)}?fullText=false`
    );

    if (!res.ok) {
       return { status: res.status, data: null };
    }

    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching country data:', error);
    return null;
  }
}

