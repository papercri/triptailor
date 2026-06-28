export type Props = {
  coords: {
    lat: number;
    lng: number;
    displayName: string;
  };
  countryData: CountryData | null;
  timeZone: string;
  weatherData: WeatherData;
  cityName: string;
  countryCommonName: string;
  breadcrumbDisplay: string;
  cuisineData: CuisineData;
  cultureData: CultureData;
};

export interface CountryData {
  region: string | null;
  capital: string[];
  population: number | null;
  area: number | null;
  callingCodes: string[];
  tld: string[];
  car: {
    side: string | null;
  };
  flagSvg: string | null;
  flagEmoji: string | null;
  currencies: Currency[];
  languages: Language[];
}

export interface Language {
  bcp47: string;
  iso639_1: string;
  iso639_2b: string;
  iso639_2t: string;
  iso639_3: string;
  name: string;
  native_name: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
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