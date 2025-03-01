/*
  # E-commerce and Payment System Schema

  1. New Tables
    - products (product catalog)
    - orders (user orders)
    - order_items (items in each order)
    - payments (payment records)
    - cart_items (shopping cart)
    
  2. Security
    - Enable RLS on all tables
    - Add policies for data access control
    
  3. Performance
    - Add indexes for frequently queried columns
*/

DO $$ BEGIN
  -- Products table
  CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    price numeric NOT NULL CHECK (price >= 0),
    stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
    created_at timestamptz DEFAULT now()
  );

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Anyone can read products'
  ) THEN
    ALTER TABLE products ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Anyone can read products" ON products FOR SELECT TO authenticated USING (true);
  END IF;

  -- Orders table
  CREATE TABLE IF NOT EXISTS orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    total_amount numeric NOT NULL CHECK (total_amount >= 0),
    created_at timestamptz DEFAULT now()
  );

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Users can read own orders'
  ) THEN
    ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can read own orders" ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;

  -- Order items table
  CREATE TABLE IF NOT EXISTS order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES orders(id) NOT NULL,
    product_id uuid REFERENCES products(id) NOT NULL,
    quantity integer NOT NULL CHECK (quantity > 0),
    price numeric NOT NULL CHECK (price >= 0)
  );

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'order_items' AND policyname = 'Users can read own order items'
  ) THEN
    ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can read own order items" ON order_items FOR SELECT TO authenticated
    USING (EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    ));
  END IF;

  -- Payments table
  CREATE TABLE IF NOT EXISTS payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid REFERENCES orders(id) NOT NULL,
    amount numeric NOT NULL CHECK (amount >= 0),
    provider text NOT NULL,
    status text NOT NULL,
    transaction_id text,
    created_at timestamptz DEFAULT now()
  );

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'payments' AND policyname = 'Users can read own payments'
  ) THEN
    ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can read own payments" ON payments FOR SELECT TO authenticated
    USING (EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = payments.order_id
      AND orders.user_id = auth.uid()
    ));
  END IF;

  -- Cart items table
  CREATE TABLE IF NOT EXISTS cart_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    product_id uuid REFERENCES products(id) NOT NULL,
    quantity integer NOT NULL CHECK (quantity > 0),
    created_at timestamptz DEFAULT now()
  );

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'cart_items' AND policyname = 'Users can manage own cart'
  ) THEN
    ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Users can manage own cart" ON cart_items FOR ALL TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
  END IF;

  -- Profiles table for additional user data
  CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id),
    role text NOT NULL DEFAULT 'user',
    created_at timestamptz DEFAULT now()
  );

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles'
  ) THEN
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Public profiles are viewable by everyone." ON profiles
    FOR SELECT USING (true);

    CREATE POLICY "Users can insert their own profile." ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

    CREATE POLICY "Users can update own profile." ON profiles
    FOR UPDATE USING (auth.uid() = id);
  END IF;

  -- Indexes for better performance
  CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
  CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
  CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
  CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
END $$;