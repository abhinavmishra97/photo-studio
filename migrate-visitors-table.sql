-- Migration Script: Convert visitors table to simplified visitor_stats table
-- Run this in Supabase SQL Editor

-- Step 1: Drop the old visitors table if it exists
DROP TABLE IF EXISTS visitors CASCADE;

-- Step 2: Create the new simplified visitor_stats table
CREATE TABLE IF NOT EXISTS visitor_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    total_count INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Step 3: Insert initial row (only one row will ever exist)
INSERT INTO visitor_stats (id, total_count, last_updated)
VALUES (1, 0, NOW())
ON CONFLICT (id) DO NOTHING;

-- Step 4: Enable Row Level Security
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop old policies if they exist
DROP POLICY IF EXISTS "Admin users can view visitors" ON visitor_stats;
DROP POLICY IF EXISTS "Allow anonymous visitor tracking" ON visitor_stats;
DROP POLICY IF EXISTS "Admin users can view visitor stats" ON visitor_stats;
DROP POLICY IF EXISTS "Allow anonymous visitor count increment" ON visitor_stats;

-- Step 6: Create new policies
-- Policy: Only authenticated admin users can read stats
CREATE POLICY "Admin users can view visitor stats"
    ON visitor_stats
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow anonymous updates (for incrementing count)
CREATE POLICY "Allow anonymous visitor count increment"
    ON visitor_stats
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Step 7: Grant permissions
GRANT SELECT ON visitor_stats TO authenticated;
GRANT UPDATE ON visitor_stats TO anon;

-- Step 8: Drop old function if it exists
DROP FUNCTION IF EXISTS increment_visitor_count();

-- Step 9: Create the increment function
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE visitor_stats
    SET total_count = total_count + 1,
        last_updated = NOW()
    WHERE id = 1;
END;
$$;

-- Step 10: Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_visitor_count() TO anon;

-- Verification: Check the table
SELECT * FROM visitor_stats;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE 'Old visitors table has been dropped.';
    RAISE NOTICE 'New visitor_stats table created with initial count of 0.';
END $$;
