
'use client';

import { createContext, useState } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/footer/Footer';
import ChatBot from '@/components/ChatBot';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { ThemeProvider } from 'next-themes';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const inter = Inter({ subsets: ['latin'] });
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export const SearchContext = createContext({
  searchParams: { location: '', guests: null },
  setSearchParams: () => {},
});

export default function RootLayout({ children }) {
  const [searchParams, setSearchParams] = useState({ location: '', guests: null });

  const handleSearch = ({ location, guests }) => {
    setSearchParams({ location, guests });
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <SearchContext.Provider value={{ searchParams, setSearchParams }}>
              <Header onSearch={handleSearch} />
              <Elements stripe={stripePromise}>
                <main className="container mx-auto px-4 min-h-screen">{children}</main>
              </Elements>
              <ChatBot />
              <Footer />
            </SearchContext.Provider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
