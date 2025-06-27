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
  return trimmed;
}

export async function getCountryData(countryName: string) {
  try {
    const cleanedName = normalizeCountryName(countryName);
    const normalizedCountryName = countryNameMap[cleanedName] || cleanedName;

    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(normalizedCountryName)}?fullText=false`;
    const res = await fetch(url);
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
      const raw = await res.text(); // Evita error de parseo
      console.error(`❌ Invalid response from getCountryData (${res.status}):`, raw.slice(0, 300));
      throw new SyntaxError("Invalid JSON response");
    }

    const data = await res.json();
    return data[0] ?? null;

  } catch (error) {
    console.error('❌ Error fetching country data:', error);
    return null;
  }
}
