
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

const RESPONSE_FIELDS = [
  'names.common',
  'names.official',
  'flag.emoji',
  'flag.url_svg',
  'region',
  'capitals',
  'population',
  'area.kilometers',
  'calling_codes',
  'tlds',
  'cars.driving_side',
  'currencies',
  'languages',
].join(',');

export async function getCountryData(countryName: string) {
  try {
    const cleanedName = normalizeCountryName(countryName);
    const normalizedCountryName = countryNameMap[cleanedName] || cleanedName;

    const url = `https://api.restcountries.com/countries/v5/name?q=${encodeURIComponent(
      normalizedCountryName
    )}&response_fields=${RESPONSE_FIELDS}`;

    //console.log('Normalized Country Name:', normalizedCountryName);

    //console.log('DEBUG url:', url);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_RESTCOUNTRIES_API_KEY}`,
      },
    });

   // console.log('DEBUG status:', res.status);

    const text = await res.text();
    // console.log('DEBUG body:', text.slice(0, 500));

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok || !contentType.includes('application/json')) {
      console.error(`Invalid response from getCountryData (${res.status}):`, text.slice(0, 300));
      throw new SyntaxError('Invalid or non-JSON response');
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch (jsonErr) {
      console.error('Failed to parse JSON in getCountryData:', jsonErr, text.slice(0, 300));
      throw new SyntaxError('Failed to parse country data JSON');
    }

    if (json.errors) {
      console.error('REST Countries API error:', json.errors[0]?.message);
      return null;
    }

    const objects = json?.data?.objects;
    const raw = Array.isArray(objects) ? objects[0] ?? null : null;
    if (!raw) return null;

    // v5 devuelve keys planas con punto literal (ej: "names.common")
    // cuando se usa response_fields. Lo normalizamos a un shape simple
    // para no tocar los componentes que ya consumen estos datos.
    return {
      region: raw['region'] ?? null,
      capital: Array.isArray(raw['capitals'])
        ? raw['capitals'].map((c: { name: string }) => c.name)
        : [],
      population: raw['population'] ?? null,
      area: raw['area.kilometers'] ?? null,
      callingCodes: raw['calling_codes'] ?? [],
      tld: raw['tlds'] ?? [],
      car: { side: raw['cars.driving_side'] ?? null },
      flagSvg: raw['flag.url_svg'] ?? null,
      flagEmoji: raw['flag.emoji'] ?? null,
      currencies: raw['currencies'] ?? null,
      languages: Array.isArray(raw['languages']) ? raw['languages'] : [],
    };
  } catch (error) {
    console.error('Error fetching country data:', error);
    return null;
  }
}
