import React, { createContext } from 'react';
// Marking this component as a Client Component
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

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
        <Card key={property.id}>
          <CardHeader>
            <CardTitle>{property.title}</CardTitle>
            <CardDescription>{property.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-md" />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-lg font-semibold">${property.price} / {t('night')}</span>
            <Button>{t('book_now')}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
