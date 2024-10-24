import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';

export default function BookingForm({ propertyId, price }) {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleBooking = async () => {
    const booking = {
      propertyId,
      userId: 'user123', 
      checkIn,
      checkOut,
      guests,
      totalPrice: price * (((checkOut - checkIn) / (1000 * 60 * 60 * 24)) + 1)
    };

    try {
      const response = await fetch('http://localhost:5000/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      const data = await response.json();
      console.log('Booking created:', data);
      // Handle successful booking (e.g., show confirmation, redirect)
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Book this property</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">Check-in</label>
          <Calendar
            mode="single"
            selected={checkIn}
            onSelect={setCheckIn}
            className="rounded-md border"
          />
        </div>
        <div>
          <label className="block mb-2">Check-out</label>
          <Calendar
            mode="single"
            selected={checkOut}
            onSelect={setCheckOut}
            className="rounded-md border"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Guests</label>
        <Input
          type="number"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          min={1}
        />
      </div>
      <Button onClick={handleBooking} className="w-full">Book Now</Button>
    </div>
  );
}