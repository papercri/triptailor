'use client';
import '@/styles/destination.scss';
import React, { Suspense } from 'react';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import DestinationHero from '@/components/destination/hero/DestinationHero';
import QuickInfo from '@/components/destination/quickInfo/QuickInfo';
import Info from '@/components/destination/generalInfo/Info';
import Clima from '@/components/destination/clima/Clima';
import CompoMap from '@/components/destination/map/CompoMap';
import Cuisine from '@/components/destination/cuisine/Cuisine';
import Culture from '@/components/destination/culture/Culture';
import TravelAssistantModal from '@/components/openAi/travelAssistent/TravelAssistantModal';
import {  Props } from '@/types/destinationProps';


function Spinner() {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 150px;
        }
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border-left-color: #09f;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function DestinationClient({
  coords,
  countryData,
  timeZone,
  weatherData,
  cityName,
  countryCommonName,
  breadcrumbDisplay,
  cuisineData,
  cultureData,
}: Props) {

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
                  <div className="info-grid">
                    <Suspense fallback={<Spinner />}>
                      <Info
                        countryData={countryData}
                        countryCommonName={countryCommonName}
                      />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <Clima weatherData={weatherData} />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <CompoMap
                        lat={coords.lat}
                        lng={coords.lng}
                        place={coords.displayName}
                      />
                    </Suspense>
                  </div>
                </div>
     
                <div className="info-section">
                  <div className="info-grid info-grid__2col">
                    <Suspense fallback={<Spinner />}>
                      <Cuisine cuisineData={cuisineData} />
                    </Suspense>
                    <Suspense fallback={<Spinner />}>
                      <Culture 
                      cultureData={cultureData}
                      countryCommonName={countryCommonName} />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
            <TravelAssistantModal destination={cityName}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
