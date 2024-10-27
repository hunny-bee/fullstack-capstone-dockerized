
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QDXN2CT5xn2yzYH7VEzKyYlaRUHGoL2deqsGZFcYW5Bj017xjFu1J6yj8MZeYRZDfHS0Fg2J2hDBGJic5azouZw00Jq1ih0Ph'); // Replace with your Stripe publishable key

const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
