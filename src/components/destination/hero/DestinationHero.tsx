import CountryBackgroundImage from '@/components/destination/countryBackgroundImage/CountryBackgroundImage'; 
import React from 'react';

type DestinationHeroProps = {

  breadcrumbDisplay: string;
  countryData: {
    flags: {
      svg: string;
    };
  };
  countryCommonName: string;
  cityName: string;
};

export default function DestinationHero({

  breadcrumbDisplay,
  countryData,
  countryCommonName,
  cityName,
}: DestinationHeroProps) {
  return (
    <section className="destination-hero">
      <div className="destination-hero__image !bg-transparent z-10 absolute">
        <CountryBackgroundImage cityName={cityName} />
        <div className="destination-hero__overlay">
          <div className="container">
            <div className="destination-hero__content">
              <div className="breadcrumb">
                <a href="index.html">Home</a>
                <span>›</span>
                <span>Destinations</span>
                <span>›</span>
                <span>{breadcrumbDisplay}</span>
              </div>
              <div className='flex gap-5 items-center '>
                <div className='flag-container w-[50px] min-w-[50px] h-[50px] rounded-full overflow-hidden shadow-lg mb-5'>
                  {countryData?.flags?.svg && (
                    <img
                      src={countryData.flags.svg}
                      alt={`Flag of ${countryCommonName}`}
                      className="flag-image h-full object-cover relative "
                    />
                  )}
                </div>
                <h1 className="capitalize !mb-0 leading-8 sm:leading-normal">Discover {breadcrumbDisplay} </h1>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

  )
}