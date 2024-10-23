'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <div className="relative h-[600px] mb-12">
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        alt="Beautiful vacation rental"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find your next stay
          </h1>
          <p className="text-xl text-white mb-8">
            Search low prices on homes, apartments, and much more...
          </p>
          <Button size="lg" className="bg-primary text-white hover:bg-primary-dark">
            Explore Now
          </Button>
        </div>
      </div>
    </div>
  );
}