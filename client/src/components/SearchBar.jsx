import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export default function ReviewList({ propertyId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/reviews/${propertyId}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [propertyId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
      {reviews.map((review) => (
        <div key={review._id} className="mb-4 p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center mb-2">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-semibold">{review.rating}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}