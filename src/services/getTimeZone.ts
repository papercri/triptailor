export const getTimeZone = async (lat: number, lng: number) => {
  const apiKey = process.env.TIMEZONEDB_API_KEY;

  if (!apiKey) {
    throw new Error('Missing TIMEZONEDB_API_KEY environment variable');
  }

  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;

  const res = await fetch(url, {
    next: { revalidate: 86400 }, // 1 día
  });

  const contentType = res.headers.get('content-type') || '';

  if (!res.ok || !contentType.includes('application/json')) {
    const raw = await res.text();
    console.error(`❌ Invalid response from TimeZoneDB (${res.status}):`, raw.slice(0, 300));
    throw new SyntaxError('Invalid JSON response from TimeZoneDB');
  }

  const data = await res.json();

  if (data.status !== 'OK') {
    throw new Error(`Failed to fetch timezone data: ${data.message || 'Unknown error'}`);
  }

  return data.zoneName;
};
