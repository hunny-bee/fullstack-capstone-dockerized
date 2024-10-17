import React, { createContext } from 'react';
// Marking this component as a Client Component
'use client';
import '../globals.css';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';

export default function PropertyListing() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const dummyProperties = [
      {
        id: 1,
        title: 'Cozy Beachfront Cottage',
        description: 'Relax in this charming cottage with stunning ocean views.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2',
      },
      {
        id: 2,
        title: 'Modern City Apartment',
        description: 'Stylish apartment in the heart of the city.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      },
      {
        id: 3,
        title: 'Mountain Retreat Cabin',
        description: 'Escape to nature in this secluded mountain cabin.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
      },
    ];
    setProperties(dummyProperties);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <CardContent className="p-0">
            <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
            <div className="absolute top-2 right-2">
              <Button variant="ghost" className="text-white hover:text-gray-200">
                <HeartIcon className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{property.title}</CardTitle>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-semibold">4.95</span>
              </div>
            </div>
            <CardDescription>{property.description}</CardDescription>
          </CardHeader>
          <CardFooter className="pt-2 flex flex-col items-start">
            <div className="text-sm text-gray-600 mb-2">Nov 4 - 9</div>
            <div className="font-semibold">${property.price} / {t('night')}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
