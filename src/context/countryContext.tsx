import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CountryContextType {
  countryName: string;
  setCountryName: (name: string) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [countryName, setCountryName] = useState('');

  return (
    <CountryContext.Provider value={{ countryName, setCountryName }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
