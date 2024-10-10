import React from 'react';
import { FaHeart } from 'react-icons/fa';

const PropertyCard = () => {
  const properties = [
    {
      id: 1,
      price: 200,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'A cozy 3-bedroom house near the beach with ocean views.',
      location: 'Cape Town, South Africa',
      reviews: 4.5,
    },
    {
      id: 2,
      price: 250,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      description: 'Modern 4-bedroom home in the city center with open-plan living.',
      location: 'Johannesburg, South Africa',
      reviews: 4.8,
    },
    {
      id: 3,
      price: 300,
      image: 'https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      description: 'A luxurious house surrounded by nature, perfect for relaxation.',
      location: 'Durban, South Africa',
      reviews: 4.9,
    },
    {
      id: 4,
      price: 350,
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
      description: 'Spacious home with a private garden and pool in Pretoria.',
      location: 'Pretoria, South Africa',
      reviews: 4.7,
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {properties.map((property) => (
          <div key={property.id} className="cursor-pointer p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
            <div className="relative overflow-hidden rounded-lg">
              <div className="absolute top-2 right-2 z-10">
                <button className="p-2 bg-white rounded-full shadow-md">
                  <FaHeart className="text-gray-600 hover:text-red-500 transition duration-300" />
                </button>
              </div>
              <img
                src={property.image}
                alt="Property"
                className="object-cover w-full h-80 rounded-lg hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="mt-4">
              <p className="mt-2 text-lg font-medium text-gray-600">
                <strong>${property.price}</strong> per night
              </p>
              <p className="mt-2 text-gray-700">{property.description}</p>
            </div>
            <div className="mt-2 text-base text-gray-600">
              <p><strong>Location:</strong> {property.location}</p>
            </div>
            <div className="mt-2 text-base text-gray-600">
              <p><strong>Reviews:</strong> {property.reviews} ★</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyCard;
