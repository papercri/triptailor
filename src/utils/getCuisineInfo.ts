

export async function getCuisineInfo(country: string) {
  try {
    const cuisineTitle = `Cuisine_of_${country}`;
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${cuisineTitle}`);
    
    if (!response.ok) throw new Error('No data found');

    const data = await response.json();
    return {
      title: data.title,
      extract: data.extract,
      image: data.thumbnail?.source || null,
      wikipediaUrl: data.content_urls?.desktop?.page || null,
    };
  } catch (error) {
    console.error('Error fetching cuisine info:', error);
    return null;
  }
}
