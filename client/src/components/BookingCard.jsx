'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { addDays, format } from 'date-fns';

const BookingCard = ({ price, currency, maxGuests }) => {
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 5),
  });

  const handleBooking = () => {
    console.log('Booking:', { dateRange, guests });
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
          Book now
        </Button>

        <div className="text-center text-sm text-gray-500">
          You won't be charged yet
        </div>

        {dateRange.from && dateRange.to && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>
                {currency}{price} x{' '}
                {Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))} nights
              </span>
              <span>
                {currency}
                {price * Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))}
              </span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>
                {currency}
                {price * Math.ceil((dateRange.to - dateRange.from) / (1000 * 60 * 60 * 24))}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BookingCard;
