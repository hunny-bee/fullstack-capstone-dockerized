"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function PropertyPage({ params }) {
  const [property, setProperty] = useState(null);
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [guests, setGuests] = useState(1);
  const { t } = useTranslation('common');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (!property) {
    return <div>{t('loading')}</div>;
  }

  const handleBooking = () => {
    // Implement booking logic here
    console.log('Booking:', { property, dateRange, guests });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{property.title}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <Image
            src={property.image}
            alt={property.title}
            width={600}
            height={400}
            style={{ borderRadius: '0.5rem' }}
          />
          <p style={{ marginTop: '1rem', color: '#6b7280' }}>{property.description}</p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
            {t('amenities')}
          </h2>
          <ul style={{ paddingInlineStart: '1.25rem' }}>
            {property.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>{t('bookThisPlace')}</h2>
            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
              {t('pricePerNight', { price: property.price })}
            </p>
            <label htmlFor="date-range" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              {t('dateRange')}
            </label>
            <input
              type="date"
              id="date-range"
              value={dateRange.from.toISOString().split('T')[0]}
              onChange={(e) => setDateRange({ ...dateRange, from: new Date(e.target.value) })}
              style={{ display: 'block', marginBottom: '1rem' }}
            />
            <input
              type="date"
              id="date-range"
              value={dateRange.to.toISOString().split('T')[0]}
              onChange={(e) => setDateRange({ ...dateRange, to: new Date(e.target.value) })}
              style={{ display: 'block', marginBottom: '1rem' }}
            />
            <div style={{ marginTop: '1rem' }}>
              <label htmlFor="guests" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                {t('guests')}
              </label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                min={1}
                max={property.maxGuests}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}
              />
            </div>
            <button
              onClick={handleBooking}
              style={{
                display: 'block',
                width: '100%',
                marginTop: '1.5rem',
                padding: '0.75rem',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '0.25rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {t('book')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export async function getStaticPaths() {
  // Implement this function to generate static paths for all properties
  return {
    paths: [],
    fallback: 'blocking',
  };
}
