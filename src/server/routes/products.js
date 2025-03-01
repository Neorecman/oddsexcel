import express from 'express';
import { supabase } from '../index.js';
import { authorize } from '../middleware/authenticate.js';
import { z } from 'zod';

const router = express.Router();

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number().int().min(0)
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (admin only)
router.post('/', authorize(['admin']), async (req, res) => {
  try {
    const product = productSchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (admin only)
router.put('/:id', authorize(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const updates = productSchema.partial().parse(req.body);

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const productsRouter = router;