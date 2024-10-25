// components/CheckoutForm.jsx
'use client';

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth"; // Assuming useAuth hook is set up to fetch user data
import Confetti from 'react-confetti'; // Import the confetti component

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth(); // Get user information from the auth hook
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to manage confetti
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error messages

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    
    const clientSecret = ''; // Replace this with your actual client secret

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.log('[error]', error);
      setErrorMessage(error.message); // Set the error message
    } else {
      console.log('[PaymentIntent]', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true); // Trigger confetti animation on success
      }
    }
  };

  return (
    <div>
      {paymentSuccess && <Confetti />}
      <form onSubmit={handleSubmit}>
        <CardElement className="my-4" />
        <Button type="submit" disabled={!stripe} className="w-full mt-4">Pay Now</Button>
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error messages */}
    </div>
  );
};

export default CheckoutForm;
