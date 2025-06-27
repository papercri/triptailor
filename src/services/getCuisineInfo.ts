import { toTitleCase } from '../utils/scripts';

export async function getCuisineInfo(country: string) {
  try {
    const cuisineTitle = `Cuisine_of_${toTitleCase(country)}`;
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${cuisineTitle}`;
    
    const response = await fetch(url, {
      next: { revalidate: 604800 }, // Revalidación semanal (7 días)
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok || !contentType.includes("application/json")) {
      const raw = await response.text();
      console.error(`❌ Wikipedia Cuisine API (${response.status}):`, raw.slice(0, 300));
      throw new SyntaxError("Invalid JSON response from Wikipedia (cuisine)");
    }

    const data = await response.json();

    if (!data.title || !data.extract) {
      throw new Error("Incomplete cuisine data from Wikipedia");
    }

    return {
      title: data.title,
      extract: data.extract,
      image: data.thumbnail?.source || null,
      wikipediaUrl: data.content_urls?.desktop?.page || null,
    };
  } catch (error) {
    console.error('🍽️ Error fetching cuisine info:', error);
    return null;
  }
}
