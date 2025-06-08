export interface Currency {
  name: string;
  symbol: string;
}

export interface CountryData {
  languages?: Record<string, string>;
  currencies?: Record<string, Currency>;
}



