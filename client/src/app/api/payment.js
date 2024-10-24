const stripe = require('stripe')('your_stripe_secret_key');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentMethod } = req.body;

    try {
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000, 
        currency: 'usd',
        payment_method: paymentMethod.id,
        confirm: true,
      });

      res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
