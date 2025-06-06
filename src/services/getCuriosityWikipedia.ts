
export async function getCuriosityFromWikipedia(place: string): Promise<string | null> {
  const endpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place)}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) return null;

    const data = await res.json();
    return data.extract || null;
  } catch (error) {
    console.error('Error fetching Wikipedia summary:', error);
    return null;
  }
}
