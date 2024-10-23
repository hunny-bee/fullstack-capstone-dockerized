'use client';

import React from 'react';
import { Star, Check } from 'lucide-react';
import { properties } from '@/data/properties';
import ImageGallery from '@/components/ImageGallery';
import BookingCard from '@/components/BookingCard';

const PropertyDetails = ({ params }) => {
  const property = properties.find((p) => p.id === parseInt(params.id));

  if (!property) {
    return <div className="container mx-auto px-4 py-8">Property not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-yellow-400 fill-current" />
        <span className="font-semibold">{property.rating}</span>
        <span className="text-gray-600">({property.reviews} reviews)</span>
        <span className="mx-2">•</span>
        <span className="text-gray-600">{property.location}</span>
      </div>

      <ImageGallery images={property.images} title={property.title} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Hosted by {property.host.name}</h2>
            <div className="flex gap-4 text-gray-600 mb-4">
              <span>{property.beds} beds</span>
              <span>•</span>
              <span>{property.baths} baths</span>
              <span>•</span>
              <span>Up to {property.guests} guests</span>
            </div>
            <p className="text-gray-700">{property.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <BookingCard
            price={property.price}
            currency={property.currency}
            maxGuests={property.guests}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
