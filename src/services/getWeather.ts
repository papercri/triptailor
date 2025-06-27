export async function getWeather(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 86400 } });
    if (!res.ok) {
      const text = await res.text();
      console.error(`OpenWeather error response (status ${res.status}):`, text);
      throw new Error(`Failed to fetch weather: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
