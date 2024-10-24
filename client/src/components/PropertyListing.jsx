'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { properties } from '@/data/properties';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Heart, List, MapPin, Star } from 'lucide-react';

export default function PropertyListing() {
  const router = useRouter();
  const [view, setView] = useState('list'); 

  const handlePropertyClick = (id) => {
    router.push(`/property/${id}`); 
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center mb-8 py-11 text-center">
        {/* <h1 className="text-4xl font-bold mb-4">Find your next stay</h1>
        <p className="text-gray-600 mb-6">Discover amazing properties for your perfect getaway</p> */}
      </div>

      {view === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
              onClick={() => handlePropertyClick(property.id)}
            >
              <CardContent className="p-0 relative">
                <div className="relative w-full h-64">
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-white hover:bg-white/20"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex flex-col items-start">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-gray-600">({property.reviews} reviews)</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{property.location}</p>
                <p className="text-sm font-semibold">
                  <span className="text-lg">{property.currency}{property.price}</span> / night
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 h-[600px] rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600">Map View Coming Soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
