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

  const incrementGuests = () => {
    if (guests < maxGuests) setGuests(guests + 1);
  };

  const decrementGuests = () => {
    if (guests > 1) setGuests(guests - 1);
  };

  return (
    <Card className="p-6 sticky top-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="mb-4">
        <span className="text-2xl font-bold text-gray-800">{currency}{price}</span>
        <span className="text-gray-600"> / night</span>
      </div>

      <div className="space-y-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal border border-gray-300 rounded-lg">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={decrementGuests} className="w-10 h-10 text-lg border-gray-300">
              -
            </Button>
            <span className="text-lg">{guests}</span>
            <Button variant="outline" onClick={incrementGuests} className="w-10 h-10 text-lg border-gray-300">
              +
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-[#fadb5e] hover:bg-[#e5a84e] text-white rounded-lg py-2 font-semibold"
          onClick={handleBooking}
        >
          Reserve
        </Button>

        <div className="text-center text-sm text-gray-500">
          You won't be charged yet
        </div>

        {dateRange.from && dateRange.to && (
          <div className="border-t pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <span>{currency}{price} x {calculateNights()} nights</span>
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
