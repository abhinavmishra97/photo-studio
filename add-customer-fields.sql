-- Add new columns to customers table
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE customers
ADD COLUMN IF NOT EXISTS spouse_name TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS city TEXT;

-- Add comments for documentation
COMMENT ON COLUMN customers.spouse_name IS 'Spouse or partner name';
COMMENT ON COLUMN customers.location IS 'Address or location details';
COMMENT ON COLUMN customers.city IS 'City name';
