
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { paymentMethodId, amount, customerDetails } = await req.json();

    
    if (!paymentMethodId) {
      return new Response("Invalid payment method", { status: 400 });
    }
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return new Response("Invalid amount", { status: 400 });
    }

    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'zar',
      payment_method: paymentMethodId,
      confirm: true,
  
      return_url: 'https://localhost:3001/success', 
    });

    console.log("Payment Intent:", paymentIntent);

    if (paymentIntent.status === 'succeeded') {
      return new Response(JSON.stringify({ success: true, paymentIntent }));
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Payment not succeeded',
          paymentIntent,
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Payment error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
