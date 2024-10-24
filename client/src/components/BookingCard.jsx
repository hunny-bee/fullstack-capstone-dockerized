'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { addDays, format, differenceInDays } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const BookingCard = ({ price, currency, maxGuests, propertyId, propertyTitle, propertyImage }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const calculateNights = () => {
    if (!dateRange.from || !dateRange.to) return 0;
    return Math.max(1, differenceInDays(dateRange.to, dateRange.from));
  };

  const calculateBasePrice = () => {
    return price * calculateNights();
  };

  const calculateGuestFee = () => {
    const baseGuestFee = guests > 2 ? (guests - 2) * 25 : 0;
    return baseGuestFee * calculateNights();
  };

  const calculateServiceFee = () => {
    return Math.round(calculateBasePrice() * 0.12);
  };

  const calculateTotal = () => {
    return calculateBasePrice() + calculateGuestFee() + calculateServiceFee();
  };

  const handleBooking = () => {
    const bookingDetails = {
      propertyId,
      propertyTitle,
      propertyImage,
      dateRange,
      guests,
      pricing: {
        basePrice: price,
        guestFee: calculateGuestFee(),
        serviceFee: calculateServiceFee(),
        total: calculateTotal(),
      },
      currency,
    };

    localStorage.setItem('pendingBooking', JSON.stringify(bookingDetails));
    router.push('/booking/confirm');
  };

  return (
    <Card className="p-6 sticky top-8">
      <div className="mb-4">
        <span className="text-2xl font-bold">{currency}{price}</span>
        <span className="text-gray-600"> / night</span>
      </div>

      <div className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(range) => setDateRange(range)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <select
            className="w-full border-gray-300 rounded-md shadow-sm"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <Button className="w-full" onClick={handleBooking}>
          Reserve
        </Button>

        <div className="text-center text-sm text-gray-500">
          You won't be charged yet
        </div>

        {dateRange.from && dateRange.to && (
          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <span>
                {currency}{price} x {calculateNights()} nights
              </span>
              <span>{currency}{calculateBasePrice()}</span>
            </div>
            {calculateGuestFee() > 0 && (
              <div className="flex justify-between">
                <span>Guest fee</span>
                <span>{currency}{calculateGuestFee()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>{currency}{calculateServiceFee()}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>{currency}{calculateTotal()}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BookingCard;