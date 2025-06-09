import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "@/styles/globals.scss";
// import { CountryProvider } from '@/context/countryContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


export const metadata: Metadata = {
  title: "TripTailor",
  description: "Your AI-powered personal travel companion. Plan, discover, and live unique experiences tailored to your style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body  className="font-sans">
     
          {children}
      
      </body>
    </html>
  );
}
