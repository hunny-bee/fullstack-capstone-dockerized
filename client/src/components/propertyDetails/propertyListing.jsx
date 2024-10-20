'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PropertyDetails from '../../components/propertyDetails/propertyListing';
import BookingForm from '../../components/bookingForm/BookingForm';
import Reviews from '../../components/reviews/Reviews';

export default function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyDetails property={property} />
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <BookingForm propertyId={property._id} />
        <Reviews propertyId={property._id} />
      </div>
    </div>
  );
}