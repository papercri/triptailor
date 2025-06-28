'use client';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import '@/styles/destination.scss';
// import DestinationHero from '@/components/destination/hero/DestinationHero';
import React, { useEffect, useState } from 'react';
import { getCountryData } from '@/services/getCountryData';
import { getTimeZone } from '@/services/getTimeZone';
import { getWeather } from '@/services/getWeather';
import { getCultureInfo } from '@/services/getCultureInfo';
import { getCuisineInfo } from '@/services/getCuisineInfo';

type ResultType = {
  countryData: unknown;
  timeZone: unknown;
  weather: unknown;
  cuisine: unknown;
  culture: unknown;
};

const Page = () => {
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const test = async () => {
      try {
        const country = 'Spain'; // Cambia esto para probar con otros países
        const lat = 40.4168;
        const lng = -3.7038;

        const countryData = await getCountryData(country);
        console.log('🌍 Country Data:', countryData);

        const timeZone = await getTimeZone(lat, lng);
        console.log('🕒 Time Zone:', timeZone);

        const weather = await getWeather(lat, lng);
        console.log('☀️ Weather:', weather);

        const cuisine = await getCuisineInfo(country);
        console.log('🍽️ Cuisine Info:', cuisine);

        const culture = await getCultureInfo(country);
        console.log('🎭 Culture Info:', culture);

        setResult({ countryData, timeZone, weather, cuisine, culture });
      } catch (err: unknown) {
        console.error('❌ Error testing APIs:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    test();
  }, []);

  return (
    <>
      <Header />
      {/* <main className="destination-detail">
         <DestinationHero
            countryData={countryData}
            breadcrumbDisplay={breadcrumbDisplay}
            countryCommonName={countryCommonName}
            cityName={cityName}
          />
      </main> */}
      <div className="p-8">
        <h1 className="text-xl font-bold mb-4">API Test Page</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          {result ? JSON.stringify(result, null, 2) : 'Loading...'}
        </pre>
      </div>
      <Footer />
    </>
  );
}

export default Page;
