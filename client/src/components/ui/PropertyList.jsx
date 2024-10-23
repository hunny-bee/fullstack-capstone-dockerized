"use client";

import { useState, useEffect } from 'react';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {properties.map((property) => (
        <a href={`/property/${property.id}`} key={property.id}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-48">
              <img
                src={property.image}
                alt={property.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <div className="flex items-center">
                  <span style={{ color: 'yellow', marginRight: '0.25rem' }}>⭐</span>
                  <span>{property.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{property.location}</p>
              <p className="font-semibold">${property.price} / night</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default PropertyList;
