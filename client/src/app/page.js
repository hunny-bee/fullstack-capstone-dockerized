'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import 'leaflet/dist/leaflet.css';
import Homepage from '@/components/Homepage';
import PropertyListing from '@/components/PropertyListing';
import SearchBar from '../components/SearchBar';
import PropertyCard from '@/components/propertyCard/PropertyCard';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import FloatingMap from './components/Floating/Floating';

export default function Home() {
  return ( 
    <LanguageProvider>
      <div className="container mx-auto px-4 py-8">
        <Homepage />
        <PropertyListing />
        <FloatingMap />
        {/* <PropertyCard/> */}
      </div>
    </LanguageProvider>
  );
}
