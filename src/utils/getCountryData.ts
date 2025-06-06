export async function getCountryData(countryName: string) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);


    if (!res.ok) {
      throw new Error(`Country not found: ${countryName}`);
    }

    const data = await res.json();
    return data[0]; 
  } catch (error) {
    console.error(' Error fetching country data:', error);
    return null;
  }
}
