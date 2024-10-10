"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { getListing } from '@/lib/api';

const BookingPage = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const listingId = searchParams.get('listingId');
  const [listing, setListing] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchListing = async () => {
      if (listingId) {
        try {
          const response = await getListing(listingId);
          setListing(response.data);
        } catch (error) {
          console.error('Error fetching listing:', error);
        }
      }
    };

    fetchListing();
  }, [listingId]);

  const handleBooking = (e) => { // Removed the TypeScript type
    e.preventDefault();
    // Implement booking logic here
    console.log('Booking', { listingId, checkIn, checkOut, guests });
  };

  if (!listing) {
    return <div>{t('Loading...')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('Book Your Stay')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{listing.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBooking}>
            <div className="mb-4">
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                {t('Check-in')}
              </label>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                {t('Check-out')}
              </label>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
                {t('Guests')}
              </label>
              <Input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                min={1}
                className="mt-1"
              />
            </div>
            <Button type="submit">{t('Book Now')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingPage;
