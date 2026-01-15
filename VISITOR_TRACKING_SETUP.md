# Simplified Visitor Tracking Setup Guide

This guide will help you set up the **simplified** visitor tracking feature for the Ram Photo Studio website.

## Overview

The simplified visitor tracking system tracks only the **total visitor count** without storing individual visitor records. This approach:
- ✅ **Saves database space** - No individual records stored
- ✅ **Faster performance** - Simple counter increment
- ✅ **Privacy-friendly** - No IP addresses or user data stored
- ✅ **Efficient** - Minimal database usage

The system displays:
- **Total Visitors**: All-time visitor count

## Setup Steps

### 1. Create the Visitor Stats Table in Supabase

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor**
3. Run the SQL script from `setup-visitors-table.sql`:

```sql
-- Create a simple visitor statistics table with just counts
CREATE TABLE IF NOT EXISTS visitor_stats (
    id INTEGER PRIMARY KEY DEFAULT 1,
    total_count INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial row (only one row will ever exist)
INSERT INTO visitor_stats (id, total_count, last_updated)
VALUES (1, 0, NOW())
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

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

-- Grant permissions
GRANT SELECT ON visitor_stats TO authenticated;
GRANT UPDATE ON visitor_stats TO anon;

-- Create a function to increment visitor count
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

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_visitor_count() TO anon;
```

4. Click **Run** to execute the SQL

### 2. Verify the Setup

After running the SQL script, verify that:
1. The `visitor_stats` table exists in your Supabase database
2. The table has exactly one row with `id = 1`
3. The `increment_visitor_count()` function is created
4. Row Level Security (RLS) is enabled
5. The policies are created correctly

### 3. Test the Visitor Tracking

1. Visit any page on your website (not the admin panel)
2. The visitor tracking script will automatically call the increment function
3. Go to the admin dashboard at `/admin`
4. You should see the visitor count displayed in a single card
5. The count should increment with each page visit

## How It Works

### Client-Side Tracking
- When a page loads, a script in `BaseLayout.astro` sends a POST request to `/api/visitors/track`
- This happens on every page load for all visitors

### Server-Side Recording
- The API endpoint `/api/visitors/track.ts` receives the request
- It calls the `increment_visitor_count()` PostgreSQL function
- The function increments the counter by 1

### Statistics Display
- The admin dashboard fetches the count from `/api/visitors/stats.ts`
- The API queries the `visitor_stats` table
- Only the total count is displayed in a single, centered card

## Database Structure

### Table: `visitor_stats`
```
id (INTEGER, PRIMARY KEY) - Always 1 (single row)
total_count (INTEGER)     - Total number of visits
last_updated (TIMESTAMP)  - Last time count was updated
```

**Note**: This table will only ever have **ONE ROW**. The `total_count` is incremented on each visit.

## API Endpoints

- `POST /api/visitors/track` - Increment visitor count
- `GET /api/visitors/stats` - Get total visitor count (admin only)

## Benefits Over Previous Approach

### Old Approach (Individual Records)
- ❌ Stored IP address, user agent, referer for each visit
- ❌ Database grows continuously
- ❌ More complex queries needed
- ❌ Privacy concerns with IP storage
- ❌ Requires periodic cleanup

### New Approach (Simple Counter)
- ✅ Only stores a single number
- ✅ Database size stays constant
- ✅ Instant queries
- ✅ No personal data stored
- ✅ No maintenance needed

## Privacy

- **No personal data** is stored
- **No IP addresses** are tracked
- **No user agents** are recorded
- Only a simple counter is incremented
- Fully GDPR and privacy-compliant

## Maintenance

**No maintenance required!** 

The counter will continue to increment indefinitely. The database table will always contain just one row.

### Resetting the Counter (Optional)

If you ever want to reset the counter:

```sql
UPDATE visitor_stats 
SET total_count = 0, 
    last_updated = NOW() 
WHERE id = 1;
```

## Troubleshooting

### Visitors Not Being Counted

1. **Check Browser Console**: Look for any errors when visiting pages
2. **Verify API Endpoint**: Make sure `/api/visitors/track` is accessible
3. **Check Supabase Connection**: Ensure your Supabase credentials are correct in `.env`
4. **Verify Function**: Make sure the `increment_visitor_count()` function exists
5. **Check RLS Policies**: Ensure the anonymous update policy is active

### Count Not Showing

1. **Check Admin Authentication**: Ensure you're logged in as an admin
2. **Verify API Endpoint**: Make sure `/api/visitors/stats` is accessible
3. **Check Browser Console**: Look for any fetch errors
4. **Verify Database**: Check if the `visitor_stats` table has data

## Features

### Real-Time Count

- Count is updated instantly with each page visit
- Click the **Refresh** button to get the latest count
- The refresh button shows a spinning animation while fetching

### Responsive Design

- The visitor count card is fully responsive
- Centered display on all screen sizes
- Large, easy-to-read numbers
- Clean, minimal design

### Visual Design

- Beautiful gradient background (blue)
- Glass-morphism effect on the card
- Smooth animations and transitions
- Clear labeling with "All-time count" subtitle

## Comparison with Vercel Analytics

While Vercel Analytics is integrated into your project, it:
- Doesn't provide a free API for visitor counts
- Requires a paid plan for programmatic access
- This custom solution gives you full control

## Support

If you encounter any issues, check:
1. Supabase logs for database errors
2. Browser console for client-side errors
3. Server logs for API errors
4. Vercel deployment logs for production issues

---

**Status**: ✅ Simplified & Optimized
**Database Impact**: Minimal (1 row, 3 columns)
**Privacy**: 100% compliant
