"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { format } from 'date-fns';
import { ChevronLeft, Facebook } from 'lucide-react';

export default function BookingConfirmation() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser } = useAuth();
  const [booking, setBooking] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States (+1)');
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState(null);

  useEffect(() => {
    const storedBooking = localStorage.getItem('pendingBooking');
    if (!storedBooking) {
      router.push('/');
      return;
    }
    setBooking(JSON.parse(storedBooking));
  }, [router]);

  const handleContinueWithPhone = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        id: '1',
        phone: phoneNumber,
        name: 'Guest User',
      });
      toast({
        title: "Verification Successful",
        description: "You can now complete your booking.",
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Please try again or use another login method.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUser({
        id: '1',
        email: email,
        name: 'Guest User',
      });
      toast({
        title: "Login Successful",
        description: "You can now complete your booking.",
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    toast({
      title: "Booking Confirmed",
      description: "Your booking has been successfully processed.",
    });
    router.push('/bookings');
  };

  const calculateNights = () => {
    return booking && booking.dateRange
      ? Math.ceil((new Date(booking.dateRange.to) - new Date(booking.dateRange.from)) / (1000 * 60 * 60 * 24))
      : 0;
  };

  if (!booking) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" className="mr-4" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-semibold">Confirm and pay</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your trip</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Dates</h3>
                  <p>
                    {format(new Date(booking.dateRange.from), "MMM d")} - {format(new Date(booking.dateRange.to), "d, yyyy")}
                  </p>
                </div>
                <Button variant="link" onClick={() => router.back()}>Edit</Button>
              </div>

              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">Guests</h3>
                  <p>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</p>
                </div>
                <Button variant="link" onClick={() => router.back()}>Edit</Button>
              </div>
            </div>
          </section>

          {!user ? (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Log in or sign up to book</h2>
              {!authMethod ? (
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" onClick={() => setAuthMethod('phone')}>
                    Continue with Phone
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setAuthMethod('email')}>
                    Continue with Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Facebook className="mr-2 h-5 w-5" />
                    Continue with Facebook
                  </Button>
                  <Button variant="outline" className="w-full">Continue with Google</Button>
                </div>
              ) : authMethod === 'phone' ? (
                <form onSubmit={handleContinueWithPhone} className="space-y-4">
                  <div className="space-y-1">
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="w-full rounded-t-lg rounded-b-none border-b-0">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States (+1)">United States (+1)</SelectItem>
                        <SelectItem value="United Kingdom (+44)">United Kingdom (+44)</SelectItem>
                        <SelectItem value="Canada (+1)">Canada (+1)</SelectItem>
                        <SelectItem value="Australia (+61)">Australia (+61)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Input
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" isLoading={isLoading}>
                    Continue
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleContinueWithEmail} className="space-y-4">
                  <div className="space-y-1">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Input
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" isLoading={isLoading}>
                    Continue
                  </Button>
                </form>
              )}
            </section>
          ) : (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Payment</h2>
              <Button onClick={handlePayment}>Confirm Payment</Button>
            </section>
          )}
        </div>

        <Card className="col-span-1">
          <div className="p-4">
            <h3 className="font-medium">Booking Summary</h3>
            {booking.room ? (
              <>
                <p>{booking.room.name}</p>
                <p>{calculateNights()} nights</p>
                <p>${booking.price}</p>
              </>
            ) : (
              <p>No room information available.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
