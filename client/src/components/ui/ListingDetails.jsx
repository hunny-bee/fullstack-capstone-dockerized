"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getListing } from '@/lib/api';

const ListingDetails = ({ id }) => {
  const { t } = useTranslation();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListing(id);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <div>{t('Loading...')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{listing.title}</h1>
      <Card>
        <CardContent className="p-0">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={listing.images[0] || `https://picsum.photos/1600/900?random=${id}`}
              alt={listing.title}
              fill
              className="object-cover rounded-t-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/1600x900?text=No+Image+Available'; // Fallback image
              }}
            />
          </AspectRatio>
        </CardContent>
      </Card>
      {/* Remaining content */}
    </div>
  );
};

export default ListingDetails;
