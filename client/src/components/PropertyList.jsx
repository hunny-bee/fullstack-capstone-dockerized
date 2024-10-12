'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { getProperties } from '@/services/propertyApi';

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const fetchedProperties = await getProperties('New York', 'NY');
        setProperties(fetchedProperties || []);  // Ensure it's an array or set an empty array as fallback
      } catch (err) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading properties...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.property_id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image
                src={property?.photo || '/default-image.jpg'} // Default image if photo is undefined
                alt={property?.short_price || 'Property Image'}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold mb-2">{property?.short_price || 'Price not available'}</CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-2">
              {/* Check if description is a string, if not fallback to a default message */}
              {typeof property.description === 'string' ? property.description : 'Description not available'}
            </CardDescription>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{property?.address_new?.city || 'City not available'}, {property?.address_new?.state || 'State not available'}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{property?.list_price_min || 'Price not available'}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-gray-50">
            <div className="w-full flex items-center justify-between">
              <span className="text-lg font-bold">${property?.list_price || 'N/A'} <span className="text-sm font-normal">/ night</span></span>
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                Book Now
              </button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}