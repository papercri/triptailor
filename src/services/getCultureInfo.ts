import { toTitleCase } from '@/utils/scripts';

export async function getCultureInfo(country: string) {
  try {
    const cultureTitle = `Culture_of_${toTitleCase(country)}`;
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${cultureTitle}`;

    const response = await fetch(url, {
      next: { revalidate: 604800 }, // 7 días
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok || !contentType.includes("application/json")) {
      const raw = await response.text();
      console.error(`❌ Wikipedia Culture API (${response.status}):`, raw.slice(0, 300));
      throw new SyntaxError("Invalid JSON response from Wikipedia (culture)");
    }

    const data = await response.json();

    if (!data.title || !data.extract) {
      throw new Error("Incomplete culture data from Wikipedia");
    }

    return {
      title: data.title,
      extract: data.extract,
      image: data.thumbnail?.source || null,
      wikipediaUrl: data.content_urls?.desktop?.page || null,
    };
  } catch (error) {
    console.error('🎭 Error fetching culture info:', error);
    return null;
  }
}
