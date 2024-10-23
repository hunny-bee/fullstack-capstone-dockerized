"use client";

import React, { useEffect, useState } from 'react';

const TrendingListings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Fetch the trending listings from your API
    const fetchListings = async () => {
      const response = await fetch('/api/trending-listings'); // Adjust the endpoint as necessary
      const data = await response.json();
      setListings(data);
    };

    fetchListings();
  }, []);

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Trending Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="border rounded-lg overflow-hidden shadow-md">
            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{listing.title}</h3>
              <p className="text-gray-500">{listing.description}</p>
              <p className="text-red-500 font-bold">${listing.price} per night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingListings;
