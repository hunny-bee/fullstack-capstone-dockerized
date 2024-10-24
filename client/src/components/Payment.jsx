import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; 


const stripePromise = loadStripe('sk_test_51QDXN2CT5xn2yzYH9Jk5xAc8pgGwgwsc9tfWenPfVDxjbbOTjrAOqD5bS4sboIt3yAMtf0Cu5B9Xo3t9z3tSPJZp004BT5t4ez');

export default function PaymentSection() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
