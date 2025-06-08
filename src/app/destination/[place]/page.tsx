import '@/styles/destination.scss'
import { notFound } from 'next/navigation';
import { getCoordinatesWithTranslation } from '@/utils/geoCordTranslatorHelper';
import { getCountryData } from '@/utils/getCountryData';
// import Curiosity from '@/components/curiosity/Curiosity';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import DestinationHero from '@/components/destination/hero/DestinationHero';
import QuickInfo from '@/components/destination/quickInfo/QuickInfo';
import Info from '@/components/destination/generalInfo/Info';
import Clima from '@/components/destination/clima/Clima';
import CompoMap from '@/components/destination/map/CompoMap';
import Cuisine from '@/components/destination/cuisine/Cuisine';
import Culture from '@/components/destination/culture/Culture';
import { getTimeZone } from '@/utils/getTimeZone';
import { translatePlaceName } from '@/utils/translatePlaces';
import { getWeather } from '@/utils/getWeather';
import { getCuisineInfo } from '@/utils/getCuisineInfo';
import { getCultureInfo } from '@/utils/getCultureInfo';

type Props = {
  params: { place: string };
};

type CoordinatesWithAddress = {
  lat: number;
  lng: number;
  displayName: string;
  address?: {
    country?: string;
    [key: string]: unknown;
  };
};

function extractCountryFromDisplayName(displayName: string, fallback: string): string {
  const parts = displayName.split(', ');
  return parts[parts.length - 1] || fallback;
}

export default async function DestinationPage({ params }: Props) {
    const place = decodeURIComponent(params.place);
    const coords = await getCoordinatesWithTranslation(place);
    if (!coords || !coords.displayName) notFound();

    const coordsWithAddress = coords as CoordinatesWithAddress;
    const countryName = coordsWithAddress.address?.country || extractCountryFromDisplayName(coords.displayName, place);
    const countryData = await getCountryData(countryName);
    const timeZone = await getTimeZone(coords.lat, coords.lng);
    const weatherData = await getWeather(coords.lat, coords.lng);
    if (!countryData || !countryData.name?.common) {
    notFound();
    }
    const parts = coords.displayName.split(', ');
    const cityName = translatePlaceName(parts[0]);
    const countryNameFromDisplay = translatePlaceName(parts[parts.length - 1]);
    const breadcrumbDisplay = `${cityName}, ${countryNameFromDisplay}`;
    const countryCommonName = countryData.name.common;
    const cuisineData = await getCuisineInfo(countryNameFromDisplay);
    const cultureData = await getCultureInfo(countryNameFromDisplay);
  
  return (
    <>
    <Header />
     <main className="destination-detail">
        <DestinationHero 
            countryData={countryData} 
            breadcrumbDisplay={breadcrumbDisplay} 
            countryCommonName={countryCommonName}
            cityName={cityName}
        />
        <QuickInfo
            weatherData={weatherData}
            countryData={countryData}
            timeZone={timeZone}
        />
      
        <section className="destination-content">
            <div className="container">
                <div className="content-grid">
                    <div className="content-main">
                        <div className="info-section">
                            <h2>Información general</h2>
                            <div className="info-grid">
                                <Info countryData={countryData} countryCommonName={countryCommonName} />
                                <Clima weatherData={weatherData} />
                                <CompoMap lat={coords.lat} lng={coords.lng} place={coords.displayName} />
                            </div>
                        </div>
                        <div className="info-section">
                            <div className="info-grid info-grid__2col">
                               <Cuisine cuisineData={cuisineData} />
                               <Culture cultureData={cultureData} />
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    <Footer />
  </>

  );
}
