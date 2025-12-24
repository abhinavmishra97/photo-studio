-- ============================================
-- Ram Digital Photo Studio - Supabase Setup
-- ============================================
-- Run this SQL in your Supabase SQL Editor

-- 1. Create the enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,  -- Optional field
    phone TEXT NOT NULL,  -- Mandatory field
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create an index on created_at for faster sorting
CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries(created_at DESC);

-- 3. Create an index on status for filtering
CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries(status);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- 5. Drop existing policies if they exist (for re-running this script)
DROP POLICY IF EXISTS "Allow public insert" ON enquiries;
DROP POLICY IF EXISTS "Allow admin read" ON enquiries;
DROP POLICY IF EXISTS "Allow admin update" ON enquiries;

-- 6. Create RLS Policy: Allow anyone to insert (for contact form submissions)
CREATE POLICY "Allow public insert"
ON enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 7. Create RLS Policy: Allow service role to read all enquiries
CREATE POLICY "Allow admin read"
ON enquiries
FOR SELECT
TO service_role
USING (true);

-- 8. Create RLS Policy: Allow service role to update enquiries
CREATE POLICY "Allow admin update"
ON enquiries
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- Verification Queries (optional - run these to test)
-- ============================================

-- Check if table was created successfully
-- SELECT * FROM enquiries LIMIT 1;

-- Check if RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'enquiries';

-- View all policies
-- SELECT * FROM pg_policies WHERE tablename = 'enquiries';
