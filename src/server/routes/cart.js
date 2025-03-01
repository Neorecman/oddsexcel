import express from 'express';
import { supabase } from '../index.js';

const router = express.Router();

// Get cart items
router.get('/', async (req, res) => {
  try {
    const { data: items, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products (*)
      `)
      .eq('user_id', req.user.userId);

    if (error) throw error;
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: req.user.userId,
        product_id: productId,
        quantity
      })
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update cart item quantity
router.put('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .eq('user_id', req.user.userId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', req.user.userId);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const cartRouter = router;