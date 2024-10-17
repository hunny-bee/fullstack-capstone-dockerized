import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Calendar, MapPin, Shield } from 'lucide-react';

export default function SinglePropertyPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const { property } = location.state;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <div className="flex items-center mb-4">
        <span className="text-sm mr-2">★ {property.rating}</span>
        <span className="text-sm underline">{property.reviews} reviews</span>
        <span className="text-sm ml-4">{property.location}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={property.image} alt={property.title} className="w-full h-auto rounded-lg" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">R{property.price} ZAR <span className="text-base font-normal">night</span></h2>
            <Button variant="primary">Reserve</Button>
          </div>

          <div className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <div>
                <div className="font-semibold">CHECK-IN</div>
                <div>{property.checkIn}</div>
              </div>
              <div>
                <div className="font-semibold">CHECKOUT</div>
                <div>{property.checkOut}</div>
              </div>
            </div>
            <div>
              <div className="font-semibold">GUESTS</div>
              <div>{property.guests} guest</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 mr-4" />
              <div>
                <div className="font-semibold">Self check-in</div>
                <div className="text-sm text-gray-600">You can check in with the building staff.</div>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-4" />
              <div>
                <div className="font-semibold">Unbeatable location</div>
                <div className="text-sm text-gray-600">100% of guests in the past year gave this location a 5-star rating.</div>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-4" />
              <div>
                <div className="font-semibold">Free cancellation before {property.freeCancellationDate}</div>
                <div className="text-sm text-gray-600">Get a full refund if you change your mind.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">About this space</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>
    </div>
  );
}