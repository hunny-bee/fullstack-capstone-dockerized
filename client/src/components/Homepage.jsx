'use client';

import React from 'react';
import { MapPin } from 'lucide-react'; 

const HomePage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      
      <img
        src="/private-islands-01.jpg" 
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      
      <div className="relative flex flex-col items-center justify-center h-full text-white bg-black bg-opacity-40">
        <div className="flex items-center mb-4">
          <h1 className="text-4xl font-bold">Find your next stay</h1>
          <MapPin className="ml-2 h-8 w-8" style={{ color: '#fadb5e' }} /> 
        </div>
        <p className="text-gray-200 mb-6">Discover amazing properties for your perfect getaway</p>
      </div>
    </div>
  );
};

export default HomePage;
