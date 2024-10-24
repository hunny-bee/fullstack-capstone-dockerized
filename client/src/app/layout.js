import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/footer/Footer';
import ChatBot from '@/components/ChatBot';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Staycation - Your Home Away from Home',
  description: 'Find and book unique accommodations around the world.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ChatBot/>
          </LanguageProvider>
        </body>
    </html>
  );
}