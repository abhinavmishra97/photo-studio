-- Complete migration: Add all missing columns to customers table
-- Run this in your Supabase SQL Editor

-- Add email column
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add spouse_name column (if not exists)
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS spouse_name TEXT;

-- Add location column (if not exists)
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS location TEXT;

-- Add city column (if not exists)
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS city TEXT;

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);

-- Add comments to document the columns
COMMENT ON COLUMN customers.email IS 'Customer email address for automated birthday/anniversary greetings';
COMMENT ON COLUMN customers.spouse_name IS 'Spouse or partner name';
COMMENT ON COLUMN customers.location IS 'Locality or area';
COMMENT ON COLUMN customers.city IS 'City name';

-- Verify all columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'customers'
ORDER BY ordinal_position;
