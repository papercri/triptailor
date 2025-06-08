import {toTitleCase} from './scripts';

export async function getCultureInfo(country: string) {
  try {
    const cultureTitle = `Culture_of_${toTitleCase(country)}`;
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${cultureTitle}`);
    console.log(country);
    if (!response.ok) throw new Error('No data found');

    const data = await response.json();
    return {
      title: data.title,
      extract: data.extract,
      image: data.thumbnail?.source || null,
      wikipediaUrl: data.content_urls?.desktop?.page || null,
    };
  } catch (error) {
    console.error('Error fetching culture info:', error);
    return null;
  }
}
