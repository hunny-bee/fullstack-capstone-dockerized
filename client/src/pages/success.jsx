
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const SuccessPage = () => {
  const [isConfettiVisible, setConfettiVisible] = useState(false);

  useEffect(() => {
    setConfettiVisible(true);
    const timer = setTimeout(() => {
      setConfettiVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      
    >
      {isConfettiVisible && (
        <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} />
      )}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center mb-8 py-11 text-center">
    
        </div>

        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 max-w-lg mx-auto p-6 border border-gray-200">
          <h2 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
          <p className="text-gray-700 mb-4">Thank you for your payment. Your booking has been confirmed.</p>
          <p className="text-gray-500 mb-6">A confirmation email will be sent shortly.</p>
          <a
            href="/"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition duration-200"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
