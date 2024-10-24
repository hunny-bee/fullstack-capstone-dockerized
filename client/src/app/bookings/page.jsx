'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Calendar, Users, Home } from 'lucide-react';

export default function BookingsPage() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push('/auth/login?redirect=/bookings');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Bookings</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Luxury Beach Villa</h2>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Apr 15, 2024 - Apr 20, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>2 guests</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Booking confirmed • Confirmation #123456
              </div>
            </div>
            <Button variant="outline" onClick={() => router.push('/property/1')}>
              View Property
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}