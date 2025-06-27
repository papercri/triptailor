export const getTimeZone = async (lat: number, lng: number) => {
  const apiKey = process.env.TIMEZONEDB_API_KEY;

  if (!apiKey) {
    throw new Error('Missing TIMEZONEDB_API_KEY environment variable');
  }

  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // Revalidar cada 24h
    });

    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';

    if (!res.ok || !contentType.includes('application/json')) {
      console.error(`❌ Invalid response from TimeZoneDB (${res.status}):`, text.slice(0, 300));
      throw new SyntaxError('Invalid JSON response from TimeZoneDB');
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error('❌ JSON parsing error from TimeZoneDB response:', parseErr, text.slice(0, 300));
      throw new SyntaxError('Failed to parse JSON from TimeZoneDB');
    }

    if (data.status !== 'OK') {
      throw new Error(`Failed to fetch timezone data: ${data.message || 'Unknown error'}`);
    }

    return data.zoneName;

  } catch (error) {
    console.error('❌ Error fetching timezone data:', error);
    throw error; // re-throw para que lo capture el SWR o caller
  }
};
