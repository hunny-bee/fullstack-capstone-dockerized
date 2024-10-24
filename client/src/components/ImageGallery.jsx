'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ImageGallery({ images, title }) {
  const [showAll, setShowAll] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle empty images array
  if (images.length === 0) {
    return <div className="container mx-auto px-4 py-8">No images available</div>;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
        <div className="relative w-full h-[400px] md:h-[500px] aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={images[0]}
            alt={`${title} - Main`}
            fill
            className="object-cover cursor-pointer"
            onClick={() => setShowAll(true)}
            priority // Load this image first
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 md:mt-0">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative h-[200px] aspect-[16/9] overflow-hidden rounded-lg cursor-pointer">
              <Image
                src={image}
                alt={`${title} - ${index + 2}`}
                fill
                className="object-cover"
                onClick={() => {
                  setCurrentImage(index + 1);
                  setShowAll(true);
                }}
                priority // Load these images as well
              />
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          className="mt-4 md:mt-0 md:self-center"
          onClick={() => setShowAll(true)}
          aria-label="Show all photos"
        >
          Show all photos
        </Button>
      </div>

      <Dialog open={showAll} onOpenChange={setShowAll}>
        <DialogContent className="max-w-7xl h-[90vh]">
          <div className="relative h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10"
              onClick={() => setShowAll(false)}
              aria-label="Close gallery"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative h-full">
              <Image
                src={images[currentImage]}
                alt={`${title} - ${currentImage + 1}`}
                fill
                className="object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={previousImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
