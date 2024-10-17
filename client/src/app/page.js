'use client';
import { useState } from 'react';

import PropertyListing from '@/components/PropertyListing';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyListing />
    </div>
  );
}