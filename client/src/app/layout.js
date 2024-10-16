import './globals.css';
import { Inter } from 'next/font/google';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
// import Header from '../components/Header';
// import Footer from '@/components/footer/Footer';
import ChatBot from '@/components/ChatBot';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Staycation - Your Home Away from Home',
  description: 'Find and book unique accommodations around the world.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <I18nextProvider i18n={i18n}>
        <body className={inter.className}>
          {/* <Header /> */}
          <main className="min-h-screen">{children}</main>
          {/* <Footer /> */}
          <ChatBot/>
        </body>
      </I18nextProvider>
    </html>
  );
}