'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { ThemeProvider } from 'next-themes';
import { createContext, useState } from 'react';
import Footer from '@/components/footer/Footer';
import ChatBot from '@/components/ChatBot';

const inter = Inter({ subsets: ['latin'] });

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
              <main className="min-h-screen pt-20">{children}</main>
            </SearchContext.Provider>
            <ChatBot />
            <Footer/>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
