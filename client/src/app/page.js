'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import PropertyList from '@/components/PropertyList';
import ActivityList from '@/components/ActivityList';
import AIChat from '@/components/AIChat';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false); // This should be managed by your authentication system

  return (
    <div className="container mx-auto px-4">
      <Hero />
      <SearchBar />
      <PropertyList />
      <ActivityList />
      <AIChat isSignedIn={isSignedIn} />
      {/* Temporary button to toggle signed-in state */}
      <button onClick={() => setIsSignedIn(!isSignedIn)} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Toggle Sign In
      </button>
    </div>
  );
}