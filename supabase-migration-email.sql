-- Migration: Add email column to customers table for automated greetings
-- Run this in your Supabase SQL Editor

-- Add email column
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add index for faster email lookups (optional but recommended)
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- Add comment to document the column
COMMENT ON COLUMN customers.email IS 'Customer email address for automated birthday/anniversary greetings';

-- Verify the column was added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'customers'
ORDER BY ordinal_position;
