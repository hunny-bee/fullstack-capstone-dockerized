import React from 'react';

const PropertyCard = () => {
  const properties = [
    {
      id: 1,
      title: 'Beautiful House 1',
      price: 200,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'This stunning house is located near the beach and offers beautiful ocean views. It has 3 bedrooms, 2 bathrooms, and a large outdoor patio.',
      location: 'Cape Town, South Africa',
      reviews: 4.5,
    },
    {
      id: 2,
      title: 'Beautiful House 2',
      price: 250,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      description: 'Located in the heart of the city, this modern house features 4 bedrooms, 3 bathrooms, and a spacious open-plan living area. Perfect for families.',
      location: 'Johannesburg, South Africa',
      reviews: 4.8,
    },
    {
      id: 3,
      title: 'Beautiful House 3',
      price: 300,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      description: 'A luxurious house surrounded by nature. This property includes a private swimming pool, 5 bedrooms, 4 bathrooms, and a large garden.',
      location: 'Durban, South Africa',
      reviews: 4.9,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mt-6">
        {properties.map((property) => (
          <div key={property.id} className="cursor-pointer flex-1 mx-4 p-4 bg-white rounded-lg shadow-lg">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={property.image}
                alt={property.title}
                className="hover:scale-105 object-cover transition-transform duration-300 w-full h-48 rounded-lg" // Adjusted height to 48
              />
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-gray-800">{property.title}</h2>
              <p className="mt-2 text-lg font-medium text-gray-600">
                <strong>${property.price}</strong> per night
              </p>
            </div>
            <div className="mt-2 text-base text-gray-700">
              <p>{property.description}</p>
            </div>
            <div className="mt-3 text-base text-gray-600">
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
