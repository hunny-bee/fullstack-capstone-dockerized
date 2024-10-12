"use client";

import { useState } from 'react';
import { format } from 'date-fns';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', { location, checkIn, checkOut, guests });
    // Implement search functionality here
  };

  const toggleCheckInCalendar = () => setIsCheckInOpen(!isCheckInOpen);
  const toggleCheckOutCalendar = () => setIsCheckOutOpen(!isCheckOutOpen);

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
      <input
        type="text"
        placeholder="Where are you going?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-grow"
      />
      
      <div className="relative">
        <button onClick={toggleCheckInCalendar} className="outline-button">
          <span>🗓️</span>
          {checkIn ? format(checkIn, 'PPP') : 'Check-in'}
        </button>
        {isCheckInOpen && (
          <div className="absolute bg-white p-2 shadow-lg">
            <input
              type="date"
              value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
              onChange={(e) => setCheckIn(new Date(e.target.value))}
            />
          </div>
        )}
      </div>
      
      <div className="relative">
        <button onClick={toggleCheckOutCalendar} className="outline-button">
          <span>🗓️</span>
          {checkOut ? format(checkOut, 'PPP') : 'Check-out'}
        </button>
        {isCheckOutOpen && (
          <div className="absolute bg-white p-2 shadow-lg">
            <input
              type="date"
              value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
              onChange={(e) => setCheckOut(new Date(e.target.value))}
            />
          </div>
        )}
      </div>

      <input
        type="number"
        placeholder="Guests"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value))}
        min={1}
        className="w-24"
      />
      
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
