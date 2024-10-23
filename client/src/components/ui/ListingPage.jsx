"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import Link from 'next/link';
import { getListings } from '@/lib/api';

const ListingsPage = () => {
  const { t } = useTranslation();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getListings();
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('All Listings')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Link href={`/listings/${listing._id}`} key={listing._id}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={listing.images[0] || 'https://source.unsplash.com/random/800x600?house'}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </AspectRatio>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <h3 className="font-semibold">{listing.title}</h3>
                <p className="text-sm text-gray-500">{listing.location}</p>
                <p className="mt-2">
                  <span className="font-bold">${listing.price}</span> / {t('night')}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListingsPage;
