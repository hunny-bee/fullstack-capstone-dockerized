// CheckIn.js
import React from 'react';

const CheckIn = ({ onCheckInChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="checkIn" className="mr-2 text-gray-600">Check-In</label>
      <input 
        type="date" 
        id="checkIn" 
        className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 p-2 rounded-lg border"
        onChange={(e) => onCheckInChange(e.target.value)}
      />
    </div>
  );
};

export default CheckIn;
