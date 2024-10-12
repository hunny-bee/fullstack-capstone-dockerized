"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const [searchType, setSearchType] = useState('Stay');
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', { searchType, location, checkIn, checkOut, guests });
  };

  return (
    <div className="bg-gradient-to-r from-[#e5d84a] to-[#e5d84a] text-white py-20 px-4 rounded-lg my-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{t('Find your next stay or experience')}</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Button
              variant={searchType === 'Stay' ? 'filled' : 'outline'}
              onClick={() => setSearchType('Stay')}
              className="mr-2"
            >
              {t('Stay')}
            </Button>
            <Button
              variant={searchType === 'Experience' ? 'filled' : 'outline'}
              onClick={() => setSearchType('Experience')}
            >
              {t('Experience')}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              type="text"
              placeholder={t('Where are you going?')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-black"
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={`w-full justify-start text-left font-normal ${!checkIn && 'text-muted-foreground'}`}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : <span>{t('Check-in')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={`w-full justify-start text-left font-normal ${!checkOut && 'text-muted-foreground'}`}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : <span>{t('Check-out')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Input
              type="number"
              placeholder={t('Guests')}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min={1}
              className="text-black"
            />
            <Button onClick={handleSearch} className="mt-4 w-full bg-[#e5d84a] hover:bg-[#e5d84a] transition">
              {t('Search')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
