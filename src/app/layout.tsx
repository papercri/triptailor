import "./styles.css";
import "@/styles/globals.scss";
import { Inter } from 'next/font/google';
import type { Metadata } from "next";
import { UserProvider } from '@/context/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "TripTailor",
  description: "Your AI-powered personal travel companion. Plan, discover, and live unique experiences tailored to your style.",
  icons: {
    icon: "/images/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body  className="font-sans">
        <UserProvider>
            {children}
        </UserProvider>
        <ToastContainer position="top-center" autoClose={1000} />
      </body>
    </html>
  );
}
