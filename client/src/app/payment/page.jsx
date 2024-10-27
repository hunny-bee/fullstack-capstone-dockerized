
'use client';

import PaymentsPage from '@/app/CheckoutForm';

const PaymentPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Complete Your Booking</h1>
        <p className="text-center text-gray-600 mb-8">
          Secure your stay by completing your payment information.
        </p>
        <PaymentsPage/>
      </div>
    </div>
  );
};

export default PaymentPage;
