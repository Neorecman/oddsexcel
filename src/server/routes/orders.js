import express from 'express';
import { supabase } from '../index.js';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create order
router.post('/', async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    
    // Start transaction
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: req.user.userId,
        status: 'pending',
        total_amount: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }])
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Process payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.total_amount * 100, // Convert to cents
      currency: 'usd',
      payment_method: paymentMethod,
      confirm: true
    });

    // Record payment
    const { error: paymentError } = await supabase
      .from('payments')
      .insert([{
        order_id: order.id,
        amount: order.total_amount,
        provider: 'stripe',
        status: paymentIntent.status,
        transaction_id: paymentIntent.id
      }]);

    if (paymentError) throw paymentError;

    res.status(201).json({
      orderId: order.id,
      status: paymentIntent.status,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's orders
router.get('/', async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          product:products (*)
        ),
        payments (*)
      `)
      .eq('user_id', req.user.userId);

    if (error) throw error;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const ordersRouter = router;