"use client";

import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

const ExperienceCategories = () => {
  const { t } = useTranslation();

  const categories = [
    { id: 1, name: 'Outdoor Adventures', image: `https://picsum.photos/400/300?random=1` },
    { id: 2, name: 'Culinary Experiences', image: `https://picsum.photos/400/300?random=2` },
    { id: 3, name: 'Art & Culture', image: `https://picsum.photos/400/300?random=3` },
    { id: 4, name: 'Wellness & Relaxation', image: `https://picsum.photos/400/300?random=4` },
  ];

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6">{t('Discover Experiences')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover rounded-t-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image+Available'; // Fallback image
                  }}
                />
              </AspectRatio>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{t(category.name)}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ExperienceCategories;
