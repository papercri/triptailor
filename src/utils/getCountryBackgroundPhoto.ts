export async function getCountryBackgroundPhoto(country: string): Promise<string | null> {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    country
  )}&orientation=landscape&per_page=1&client_id=${accessKey}`;

  try {
    const res = await fetch(url,{
      next: { revalidate: 86400 }
    });
    if (!res.ok) throw new Error('Failed to fetch image');

    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error('Error fetching background photo:', error);
  }
  return null;
}