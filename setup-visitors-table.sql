-- Create visitors table for tracking website visits
CREATE TABLE IF NOT EXISTS visitors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address TEXT NOT NULL,
    user_agent TEXT,
    referer TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries on visited_at
CREATE INDEX IF NOT EXISTS idx_visitors_visited_at ON visitors(visited_at DESC);

-- Create index for IP address lookups
CREATE INDEX IF NOT EXISTS idx_visitors_ip ON visitors(ip_address);

-- Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admin users can read visitor data
CREATE POLICY "Admin users can view visitors"
    ON visitors
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous visitor tracking"
    ON visitors
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON visitors TO authenticated;
GRANT INSERT ON visitors TO anon;
