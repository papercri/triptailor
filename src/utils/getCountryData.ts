import { countryNameMap } from './translatePlaces';

function normalizeCountryName(name: string): string {
  const trimmed = name.trim();

  // Caso especial: si el nombre contiene varios alfabetos juntos (por ejemplo, latín + tifinagh + árabe)
  // extraemos solo la parte en caracteres latinos, espacios, guiones y comas
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

