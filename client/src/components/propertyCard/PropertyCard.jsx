'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

export default function PropertyCard({ property }) {
  const router = useRouter();

  const handlePropertyClick = () => {
    router.push(`/property/${property.id}`);
  };

  const imageSrc = property?.images?.[0] || '/fallback-image.jpg';

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
      onClick={handlePropertyClick}
    >
      <CardContent className="p-0 relative">
        <div className="relative w-full h-64">
          <Image
            src={imageSrc}
            alt={property?.title || 'Property image'}
            fill
            className="object-cover"
            priority
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white hover:bg-white/20"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </CardContent>
      <CardFooter className="p-4 flex flex-col items-start">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span>{property?.rating || 'N/A'}</span>
          <span className="text-gray-600">({property?.reviews || 0})</span>
        </div>
        <h3 className="text-lg font-semibold truncate w-full">
          {property?.title || 'Untitled Property'}
        </h3>
        <p className="text-sm text-gray-600 mb-2 truncate w-full">
          {property?.location || 'Unknown location'}
        </p>
        <p className="text-sm font-semibold">
          {property?.currency || '$'}
          {property?.price || '0'} / night
        </p>
      </CardFooter>
    </Card>
  );
}
