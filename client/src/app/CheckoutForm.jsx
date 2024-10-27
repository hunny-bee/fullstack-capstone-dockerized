
'use client'; 

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

export default function PaymentPage({ booking }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter(); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    
    const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (cardError) {
      setError(cardError.message);
      return;
    }

   
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: 1000, 
      }),
    });

    const data = await response.json();

    if (data.success) {
      setSuccess(true);
      console.log('Payment successful!', data.paymentIntent);
      
      router.push('/success'); 
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Payment {booking ? booking.title : ''}
      </h1>
      <form onSubmit={handlePayment} className="flex flex-col space-y-4">
        <div className="border rounded-md p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#333',
                  '::placeholder': {
                    color: '#aaa',
                  },
                },
                invalid: {
                  color: '#fa755a',
                  iconColor: '#fa755a',
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-300"
        >
          Pay
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {success && <div className="mt-4 text-green-600">Payment succeeded!</div>}
    </div>
  );
}

