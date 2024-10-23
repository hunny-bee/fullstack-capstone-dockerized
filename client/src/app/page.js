'use client';
import { useState } from 'react';

import PropertyListing from '@/components/PropertyListing';
import SearchBar from '../components/SearchBar';
import PropertyCard from '@/components/propertyCard/PropertyCard';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';

export default function Home() {
  return (
    <LanguageProvider>
      <div className="container mx-auto px-4 py-8">
      <PropertyListing />
      {/* <PropertyCard/> */}
    </div>
    </LanguageProvider>
  );
}