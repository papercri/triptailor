export const getTimeZone = async (lat: number, lng: number) => {
  const apiKey = process.env.TIMEZONEDB_API_KEY;
  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;

  const res = await fetch(url, {
    next: { revalidate: 86400 }
  });
  const data = await res.json();

  console.log('🕐 TimeZoneDB response:', data); 

  if (data.status !== 'OK') {
    
    throw new Error(`Failed to fetch timezone data: ${data.message || 'Unknown error'}`);
  }

  return data.zoneName;
};