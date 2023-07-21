// Server-side code (e.g., create-payment-intent route)
const stripe = require('stripe')(process.env.STRIPE_KEY);

// Function to create a Checkout Session
const createCheckoutSession = async (cartItems) => {
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:8080/checkout-success', // Replace with your success URL
      cancel_url: 'http://localhost:8080/checkout-fail', // Replace with your cancel URL
      metadata: { cartCount: cartItems.length }, // Store only the count of items in metadata
    });

    return session.id;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create a checkout session');
  }
};

// Controller function to handle payment intent creation
const createPaymentIntent = async (req, res) => {
  const cartItems = req.body.cartItems;

  if (!Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Invalid cart items' });
  }

  try {
    const sessionId = await createCheckoutSession(cartItems);

    res.status(200).json({ sessionId: sessionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a payment intent' });
  }
};

module.exports = {
  createPaymentIntent,
};
