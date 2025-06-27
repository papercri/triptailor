export async function getWeather(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OPENWEATHER_API_KEY environment variable');
  }

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 86400 } // Cache por 24h
    });

    const text = await res.text();
    const contentType = res.headers.get("content-type") || "";

    if (!res.ok || !contentType.includes("application/json")) {
      console.error(`❌ OpenWeather response (${res.status}):`, text.slice(0, 300));
      throw new SyntaxError("Invalid JSON response from OpenWeather API");
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("❌ Error parsing OpenWeather JSON:", parseError, text.slice(0, 300));
      throw new SyntaxError("Failed to parse JSON from OpenWeather");
    }

    // Validación básica del contenido esperado
    if (!data.weather || !Array.isArray(data.weather)) {
      throw new Error("Invalid structure in OpenWeather data");
    }

    return data;
  } catch (error) {
    console.error("🌦️ Error fetching weather data:", error);
    return null;
  }
}
