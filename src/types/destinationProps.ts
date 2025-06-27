export type Props = {
  coords: {
    lat: number;
    lng: number;
    displayName: string;
  };
  countryData: {
    region: string;
    capital: string[];
    population: number;
    area: number;
    idd: {
      root: string;
      suffixes: string[];
    };
    tld: string[];
    car: {
      side: string;
    };
    flags: {
      svg: string;
      png?: string;
    };
    name: {
      common: string;
      official?: string;
      nativeName?: Record<string, { official: string; common: string }>;
    };
  };
 // timeZone: string;
  weatherData: WeatherData;
  cityName: string;
  countryCommonName: string;
  breadcrumbDisplay: string;
  cuisineData: CuisineData;
  cultureData: CultureData;
};

export interface CountryData {
  region: string;
  capital: string[];
  population: number;
  area: number;
  idd: {
    root: string;
    suffixes: string[];
  };
  tld: string[];
  car: {
    side: string;
  };
  flags: {
    svg: string;
    png?: string;
  };
  name: {
    common: string;
    official?: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  languages?: Record<string, string>;
  currencies?: Record<string, Currency>;
}


export interface WeatherData {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export interface Currency {
  name: string;
  symbol: string;
}



export type CuisineData = {
  title: string;
  extract?: string;
  image?: string;
  
};

export type CultureData = {
  title: string;
  extract?: string;
  image?: string;
  
};
