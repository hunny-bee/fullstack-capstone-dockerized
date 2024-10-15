'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, Users } from 'lucide-react';

const SearchBar = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching:', { location, checkIn, checkOut, guests });
    // Implement search logic (e.g., navigate or fetch results)
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex flex-wrap -mx-3 mb-4">
        {/* Location Input */}
        <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            {t('Where')}
          </label>
          <div className="relative">
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              id="location"
              type="text"
              placeholder={t('Enter destination')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Search className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Check-in Date Input */}
        <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="check-in">
            {t('Check In')}
          </label>
          <div className="relative">
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <Calendar className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Check-out Date Input */}
        <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="check-out">
            {t('Check Out')}
          </label>
          <div className="relative">
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <Calendar className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Guests Input */}
        <div className="w-full md:w-1/4 px-3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guests">
            {t('Guests')}
          </label>
          <div className="relative">
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            />
            <Users className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {t('Search')}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
