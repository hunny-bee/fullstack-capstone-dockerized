'use client';

import { useContext, useEffect, useState } from 'react';
import { properties as allProperties } from '@/data/properties';
import PropertyListing from '@/components/PropertyListing';
import FloatingMap from './components/Floating/Floating';
import { SearchContext } from './layout';

export default function Home() {
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const { searchParams } = useContext(SearchContext);

  useEffect(() => {
    let filtered = allProperties;

    if (searchParams.location) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchParams.location.toLowerCase())
      );
    }

    if (searchParams.guests && Object.values(searchParams.guests).some(count => count > 0)) {
      const totalGuests = Object.values(searchParams.guests).reduce((sum, count) => sum + count, 0);
      filtered = filtered.filter(property => property.guests >= totalGuests);
    }

    setFilteredProperties(filtered);
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyListing properties={filteredProperties} />
      <FloatingMap />
    </div>
  );
}
