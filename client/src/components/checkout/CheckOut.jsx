// CheckOut.js
import React from 'react';

const CheckOut = ({ onCheckOutChange }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="checkOut" className="mr-2 text-gray-600">Check-Out</label>
      <input 
        type="date" 
        id="checkOut" 
        className="bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400 p-2 rounded-lg border"
        onChange={(e) => onCheckOutChange(e.target.value)}
      />
    </div>
  );
};

export default CheckOut;
