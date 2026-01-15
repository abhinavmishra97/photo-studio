# Visitor Tracking Setup Guide

This guide will help you set up the visitor tracking feature for the Ram Photo Studio website.

## Overview

The visitor tracking system automatically tracks website visitors and displays statistics in the admin dashboard, including:
- **Total Visitors**: All-time visitor count
- **Today's Visitors**: Visitors from today
- **This Week**: Visitors from the last 7 days
- **This Month**: Visitors from the last 30 days

## Setup Steps

### 1. Create the Visitors Table in Supabase

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Run the SQL script from `setup-visitors-table.sql`:

```sql
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
```

4. Click **Run** to execute the SQL

### 2. Verify the Setup

After running the SQL script, verify that:
1. The `visitors` table exists in your Supabase database
2. The table has the correct columns: `id`, `ip_address`, `user_agent`, `referer`, `visited_at`, `created_at`
3. Row Level Security (RLS) is enabled
4. The policies are created correctly

### 3. Test the Visitor Tracking

1. Visit any page on your website (not the admin panel)
2. The visitor tracking script will automatically send a POST request to `/api/visitors/track`
3. Go to the admin dashboard at `/admin`
4. You should see the visitor statistics card at the top of the page
5. The statistics should show at least 1 visitor (you!)

### 4. Understanding the Visitor Tracking

#### How It Works

1. **Client-Side Tracking**: 
   - When a page loads, a script in `BaseLayout.astro` sends a POST request to `/api/visitors/track`
   - This happens on every page load for all visitors

2. **Server-Side Recording**:
   - The API endpoint `/api/visitors/track.ts` receives the request
   - It captures the visitor's IP address, user agent, and referrer
   - This data is stored in the `visitors` table in Supabase

3. **Statistics Display**:
   - The admin dashboard fetches statistics from `/api/visitors/stats.ts`
   - The API queries the `visitors` table with date filters
   - Statistics are displayed in real-time with a refresh button

#### Privacy Considerations

- The system tracks IP addresses for counting unique visitors
- No personally identifiable information (PII) is stored
- The data is used solely for analytics purposes
- Consider adding a privacy policy to your website mentioning visitor tracking

### 5. Maintenance

#### Cleaning Old Data (Optional)

If you want to periodically clean old visitor data to save database space, you can run:

```sql
-- Delete visitor records older than 1 year
DELETE FROM visitors 
WHERE visited_at < NOW() - INTERVAL '1 year';
```

You can set this up as a scheduled job in Supabase or run it manually.

#### Monitoring

- Check the visitor statistics regularly in the admin dashboard
- Use the refresh button to get the latest counts
- Monitor your Supabase database usage to ensure you're within your plan limits

## Troubleshooting

### Visitors Not Being Tracked

1. **Check Browser Console**: Look for any errors when visiting pages
2. **Verify API Endpoint**: Make sure `/api/visitors/track` is accessible
3. **Check Supabase Connection**: Ensure your Supabase credentials are correct in `.env`
4. **Verify RLS Policies**: Make sure the anonymous insert policy is active

### Statistics Not Showing

1. **Check Admin Authentication**: Ensure you're logged in as an admin
2. **Verify API Endpoint**: Make sure `/api/visitors/stats` is accessible
3. **Check Browser Console**: Look for any fetch errors
4. **Verify Database**: Check if the `visitors` table has data

### Error Messages

- **"Failed to track visitor"**: Check Supabase connection and RLS policies
- **"Failed to fetch visitor statistics"**: Verify the stats API endpoint and admin authentication
- **"Error" in statistics**: Check the browser console for detailed error messages

## Features

### Real-Time Statistics

- Statistics are fetched when the admin dashboard loads
- Click the **Refresh** button to get updated counts
- The refresh button shows a spinning animation while fetching

### Responsive Design

- The visitor statistics card is fully responsive
- On mobile, statistics are displayed in a 2-column grid
- On desktop, all 4 statistics are shown in a row

### Visual Design

- Beautiful gradient background (purple to indigo)
- Glass-morphism effect on stat cards
- Smooth animations and transitions
- Clear, easy-to-read numbers with thousand separators

## Next Steps

Consider enhancing the visitor tracking with:
- Unique visitor tracking (using cookies or localStorage)
- Page-specific analytics
- Geographic location tracking
- Device type analytics
- Visitor journey tracking

## Support

If you encounter any issues, check:
1. Supabase logs for database errors
2. Browser console for client-side errors
3. Server logs for API errors
4. Vercel deployment logs for production issues
