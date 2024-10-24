'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/footer/Footer';
import ChatBot from '@/components/ChatBot';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <Header />
            <main className="min-h-screen pt-20">{children}</main>
            <Footer />
            <ChatBot />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}