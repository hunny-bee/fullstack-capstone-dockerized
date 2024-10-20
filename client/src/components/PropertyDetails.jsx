'use client';
import { useTranslation } from 'react-i18next';
import { Carousel } from './ui/carousel';

export default function PropertyDetails({ property }) {
  const { t } = useTranslation();

  return (
    <div>
     
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      
      <p className="text-xl text-gray-600 mb-4">
        {property.address}, {property.city}, {property.country}
      </p>

      <Carousel images={property.images} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">{t('description')}</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">{t('amenities')}</h2>
        <ul className="grid grid-cols-2 gap-4">
          {property.amenities.map((amenity, index) => (
            <li key={index} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {amenity}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">{t('pricePerNight')}</h2>
        <p className="text-gray-700">${property.pricePerNight} {t('perNight')}</p>
      </div>
    </div>
  );
}
