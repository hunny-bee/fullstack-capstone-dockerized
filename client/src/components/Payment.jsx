
'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentPage from '@/components/payment/page';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentSection({ booking }) {
  
  if (!booking) {
    return <div className="text-center">Loading booking information...</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentPage booking={booking} />
    </Elements>
  );
}
