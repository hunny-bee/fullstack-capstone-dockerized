"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker

const Hero = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState(''); // No type annotation
  const [checkIn, setCheckIn] = useState(null); // No type annotation
  const [checkOut, setCheckOut] = useState(null); // No type annotation
  const [guests, setGuests] = useState(1); // No type annotation

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', { location, checkIn, checkOut, guests });
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20 px-4 rounded-lg my-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{t('Find your next stay')}</h1>
        <p className="text-xl mb-8">{t('Search deals on hotels, homes, and much more...')}</p>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="text"
              placeholder={t('Where are you going?')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-black"
            />
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              placeholderText={t('Check-in')}
              className="text-black"
            />
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              placeholderText={t('Check-out')}
              className="text-black"
            />
            <Input
              type="number"
              placeholder={t('Guests')}
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              min={1}
              className="text-black"
            />
          </div>
          <Button onClick={handleSearch} className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600">
            {t('Search')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
