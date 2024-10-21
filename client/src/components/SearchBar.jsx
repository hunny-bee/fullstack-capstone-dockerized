'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching:', { location, dates, guests });
    // Implement search logic (e.g., navigate or fetch results)
  };

  return (
    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-md">
        <input
          className="flex-grow px-6 py-3 rounded-l-full text-gray-700 focus:outline-none"
          type="text"
          placeholder={t('Anywhere')}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="w-40 px-6 py-3 text-gray-700 focus:outline-none border-l border-gray-300"
          type="text"
          placeholder={t('Any week')}
          value={dates}
          onChange={(e) => setDates(e.target.value)}
        />
        <input
          className="w-40 px-6 py-3 text-gray-700 focus:outline-none border-l border-gray-300"
          type="text"
          placeholder={t('Add guests')}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <button
          className="bg-yellow-500 text-white p-3 rounded-full ml-2 mr-2 hover:bg-yellow-600 focus:outline-none"
          type="submit"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;