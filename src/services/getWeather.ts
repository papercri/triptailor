export async function getWeather(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OPENWEATHER_API_KEY environment variable');
  }

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

  try {
    const res = await fetch(endpoint, { next: { revalidate: 86400 } });
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
      const raw = await res.text();
      console.error(`❌ OpenWeather response (${res.status}):`, raw.slice(0, 300));
      throw new SyntaxError("Invalid JSON response from OpenWeather API");
    }

    const data = await res.json();

    // Verificamos que tenga al menos las claves básicas que esperamos
    if (!data.weather || !Array.isArray(data.weather)) {
      throw new Error("Invalid structure in OpenWeather data");
    }

    return data;
  } catch (error) {
    console.error("🌦️ Error fetching weather data:", error);
    return null;
  }
}
