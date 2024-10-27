
import CheckoutForm from '@/app/CheckoutForm';

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-4">
        
        <CheckoutForm />
      </div>
    </Elements>

  );
};

export default CheckoutPage;
