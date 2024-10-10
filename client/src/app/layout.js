import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/NavBar';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Staycation - Find Your Perfect Stay',
  description: 'Discover and book unique accommodations around the world.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}
