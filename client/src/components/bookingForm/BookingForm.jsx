'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export default function BookingForm({ propertyId }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleBooking = async () => {
    try {
      const response = await axios.post('/api/bookings', {
        propertyId,
        checkIn: format(checkIn, 'yyyy-MM-dd'),
        checkOut: format(checkOut, 'yyyy-MM-dd'),
        guests,
      });
      router.push(`/bookings/${response.data._id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{t('bookYourStay')}</h2>
      <div className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {checkIn ? format(checkIn, 'PPP') : t('checkIn')}
              <CalendarIcon className="ml-auto h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {checkOut ? format(checkOut, 'PPP') : t('checkOut')}
              <CalendarIcon className="ml-auto h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
          </PopoverContent>
        </Popover>
        <Input
          type="number"
          placeholder={t('guests')}
          min="1"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
        />
        <Button className="w-full" onClick={handleBooking}>
          {t('bookNow')}
        </Button>
      </div>
    </div>
  );
}