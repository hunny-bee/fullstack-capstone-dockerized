'use client';

import { useState } from 'react';
import { properties } from '@/data/properties';
import PropertyListing from '@/components/PropertyListing';
import FloatingMap from './components/Floating/Floating';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';

export default function Home() {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0
    }
  });

  const handleSearch = (params) => {
    setSearchParams(params);
    
    let filtered = properties;

    // Filter by location
    if (params.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(params.location.toLowerCase())
      );
    }

    // Filter by dates (availability)
    if (params.checkIn && params.checkOut) {
      // In a real app, you'd check against booking dates
      filtered = filtered;
    }

    // Filter by total guests
    const totalGuests = Object.values(params.guests).reduce((a, b) => a + b, 0);
    if (totalGuests > 0) {
      filtered = filtered.filter(property => property.guests >= totalGuests);
    }

    setFilteredProperties(filtered);
  };

  return (
    <LanguageProvider>
      <div className="container mx-auto px-4 py-8">
        <PropertyListing properties={filteredProperties} />
        <FloatingMap />
      </div>
    </LanguageProvider>
  );
}