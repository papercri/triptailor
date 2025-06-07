import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
// import { CountryProvider } from '@/context/countryContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


export const metadata: Metadata = {
  title: "TripTailor",
  description: "Tu compañero de viajes personalizado con IA. Planifica, descubre y vive experiencias únicas adaptadas a tu estilo.",
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
