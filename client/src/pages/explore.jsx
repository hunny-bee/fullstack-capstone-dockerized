
'use client';

import React, { useState } from 'react';

const ExploreData = [
  {
    id: 1,
    name: 'Cape Town',
    description: 'The Mother City offers breathtaking landscapes, from Table Mountain to stunning beaches. Explore vibrant neighborhoods, world-class vineyards, and rich history. Enjoy luxurious vacation homes near attractions, making it the perfect destination for unforgettable getaways',
    housesAvailable: 14,
    image: '/CPT.jpg',
  },
  {
    id: 2,
    name: 'Pretoria',
    description: 'Known as the Jacaranda City, boasts beautiful tree-lined streets and rich history. Explore landmarks like the Union Buildings and Pretoria Botanical Gardens. Enjoy vibrant markets and cultural attractions, making it an ideal destination for a memorable vacation.',
    housesAvailable: 14,
    image: '/house.jpg',
  },
  {
    id: 3,
    name: 'Johannesburg',
    description: 'The largest city, pulses with energy and diversity. Discover rich history at the Apartheid Museum, explore vibrant neighborhoods like Maboneng, and enjoy the bustling markets. A variety of stylish accommodations makes it perfect for unforgettable vacations',
    housesAvailable: 16,
    image: '/beach.jpg',
  },
  {
    id: 4,
    name: 'Durban',
    description: ' Known for its stunning beaches and warm climate, offers a vibrant coastal experience. Explore the uShaka Marine World, relax on the Golden Mile, and savor delicious local cuisine. With welcoming accommodations, it’s an ideal spot for a memorable holiday.',
    housesAvailable: 14,
    image: '/mabhida.jpg',
  },
  {
    id: 5,
    name: 'Gqebehra',
    description: 'A coastal gem, features beautiful beaches and rich marine life. Explore the Addo Elephant National Park, relax at the Boardwalk, and enjoy vibrant cultural attractions. With charming accommodations, its perfect for a relaxing seaside getaway.',
    housesAvailable: 19,
    image: '/house3.jpg',
  },
  {
    id: 6,
    name: 'Bloemfontein',
    description: ' the judicial capital of South Africa, is rich in history and culture. Discover the National Museum, explore the beautiful Franklin Game Reserve, and enjoy vibrant gardens. With cozy accommodations, its an ideal destination for a peaceful retreat.',
    housesAvailable: 8,
    image: '/bloem.jpg',
  },
];

const ExploreSA = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPartner = ExploreData[currentIndex];

  return (
    <div className="relative bg-gray-100 flex flex-col items-center py-1 h-[700px] pb-10">
      <h1 className="text-4xl font-bold mb-8 text-center mt-10">Explore our beatiful cities</h1>

      
      <div className="flex space-x-4 mb-4">
        {ExploreData.slice(0, 6).map((partner, index) => (
          <button
            key={partner.id}
            onClick={() => setCurrentIndex(index)}
            className={`px-3 py-1 rounded-lg ${index === currentIndex ? 'text-black' : 'text-gray-500'} hover:underline`}
          >
            {partner.name}
          </button>
        ))}
      </div>

      
      <div className="flex w-[98%] h-[99%] justify-between">
        
        <div className="relative flex-1 overflow-hidden rounded-lg shadow-lg mb-0 mr-10">
          <div
            className="relative w-full  bg-cover bg-center rounded-lg h-full"
            style={{ backgroundImage: `url(${currentPartner.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>

           
            <div className="absolute left-8 top-1/4 bottom-1/4 w-[40%] h-[70%] bg-white bg-opacity-90 p-8 shadow-lg rounded-md">
              <h2 className="text-3xl font-bold text-gray-800">{currentPartner.name}</h2>
              <p className="text-lg text-gray-700 mt-3">{currentPartner.description}</p>
              <span className="mt-3 block text-sm text-gray-500" style={{ color: '#fadb5e' }}>{currentPartner.housesAvailable} Houses available</span>
            </div>
          </div>
        </div>

        
        <div
          className="relative w-[3%] h-full bg-cover bg-center rounded-lg "
          style={{ backgroundImage: `url(${ExploreData[(currentIndex + 1) % ExploreData.length].image})` }}
        />
      </div>
    </div>
  );
};

export default ExploreSA;
