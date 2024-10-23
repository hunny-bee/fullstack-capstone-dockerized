"use client";

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { getListings } from '@/lib/api';

const placeholderImages = [
  'https://images.unsplash.com/photo-1582101924050-d574b31513e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGFpcnRuZXQlMjBpbml0aWF0aXZlfGVufDB8fHx8MTYyNjk5NzE3Mw&ixlib=rb-1.2.1&q=80&w=400',
  'https://images.unsplash.com/photo-1566489185370-8728b5ee5f8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDB8fGFpcnRuZXQlMjBpbml0aWF0aXZlfGVufDB8fHx8MTYyNjk5NzE4Ng&ixlib=rb-1.2.1&q=80&w=400',
  'https://images.unsplash.com/photo-1521747116042-5a810fda9664?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE2fHxhaXJ0bnVybWV8ZW58MHx8fHwxNjI2OTk3MTk3&ixlib=rb-1.2.1&q=80&w=400',
  // Add more images as needed
];

const getRandomPlaceholderImage = () => {
  return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
};

const FeaturedListings = () => {
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
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">{t('Featured Listings')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <Card key={listing._id}>
            <CardContent className="p-0">
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={listing.images[0] || getRandomPlaceholderImage()}
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
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
