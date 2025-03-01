import express from 'express';
import { supabase } from '../index.js';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Process refund
router.post('/refund/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (paymentError) throw paymentError;

    const refund = await stripe.refunds.create({
      payment_intent: payment.transaction_id
    });

    const { error: updateError } = await supabase
      .from('payments')
      .update({ status: 'refunded' })
      .eq('id', paymentId);

    if (updateError) throw updateError;

    res.json({ status: 'refunded', refundId: refund.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get payment history
router.get('/history', async (req, res) => {
  try {
    const { data: payments, error } = await supabase
      .from('payments')
      .select(`
        *,
        order:orders (*)
      `)
      .eq('user_id', req.user.userId);

    if (error) throw error;
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const paymentsRouter = router;