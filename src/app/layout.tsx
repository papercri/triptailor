import "./styles.css";
import "@/styles/globals.scss";
import { Inter } from 'next/font/google';
import type { Metadata } from "next";
import { UserProvider } from '@/context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "TripTailor",
  description: "Your AI-powered personal travel companion. Plan, discover, and live unique experiences tailored to your style.",
  verification: {
    google: 'aiF9Cr1ByjRFYDgzVVx7pkQx4qtk6EPCbSwDIGByR8M',
  },
  icons: {
    icon: "/images/favicon.ico?v=2",
  },
  themeColor: '#1483B4'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
    <head />
      <body  className="font-sans">
        <UserProvider>
          <ToastContainer 
              position="top-center" 
              autoClose={1000} 
              hideProgressBar={true}
              newestOnTop
              closeOnClick
              draggable
              theme="light"/>
            {children}
            <Analytics />
        </UserProvider>
      </body>
    </html>
  );
}
