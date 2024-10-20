'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { StarIcon } from 'lucide-react';

export default function Reviews({ propertyId }) {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/api/reviews/property/${propertyId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [propertyId]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{t('reviews')}</h2>
      {reviews.length === 0 ? (
        <p>{t('noReviews')}</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center mb-2">
                <p className="font-semibold mr-2">{review.user.name}</p>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`h-5 w-5 ${
                        index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}