# Testing Birthday/Anniversary Greetings Feature

## Step 1: Create Customers Table in Supabase

1. Go to your Supabase Dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Open the file `customers-setup.sql` from your project
5. Copy ALL the SQL code
6. Paste it into the Supabase SQL Editor
7. Click "Run" or press Ctrl+Enter
8. You should see: "Success. No rows returned"

## Step 2: Add a Test Customer with Upcoming Birthday

**Option A: Using the Admin Dashboard**
1. Go to `http://localhost:4321/admin`
2. Click the "Customers" tab
3. Click "Add Customer" button
4. Fill in:
   - Name: `Test Customer`
   - Phone: `9999999999`
   - Birthday: **Choose a date within the next 30 days**
     - For example, if today is Dec 24, 2025, choose any date between Dec 24, 2025 - Jan 23, 2026
     - **Important:** Use the format shown in the date picker
   - Anniversary: (optional)
   - Notes: `Test customer for greetings`
5. Click "Save"

**Option B: Using Supabase SQL Editor**
```sql
-- Insert a test customer with birthday in next 30 days
INSERT INTO customers (name, phone, birthday, notes) 
VALUES (
  'Test Customer',
  '9999999999',
  '2025-01-15',  -- Change this to a date within next 30 days from today
  'Test customer for greetings'
);
```

## Step 3: Verify the Greeting Button Appears

1. Refresh the page: `http://localhost:4321/admin`
2. Click "Customers" tab
3. You should see a yellow box titled "🎂 Upcoming Birthdays (Next 30 days)"
4. Inside, you should see:
   ```
   Test Customer - 15 Jan    [Greet]
   ```
5. The green "Greet" button should be visible

## Step 4: Test the Greeting Button

1. Click the green "Greet" button
2. WhatsApp should open in a new tab
3. The message should be pre-filled with birthday wishes

## Troubleshooting

### Issue: "Upcoming Birthdays" section doesn't appear
**Cause:** No customers with birthdays in the next 30 days

**Solution:**
- Make sure the birthday date is within the next 30 days from today
- Check the date format in the database (should be YYYY-MM-DD)

### Issue: Section appears but no "Greet" button
**Cause:** JavaScript not loading properly

**Solution:**
1. Open browser console (F12)
2. Check for any errors
3. Hard refresh the page (Ctrl+Shift+R)
4. Check if `/admin-dashboard.js` is loading

### Issue: Greet button doesn't work
**Cause:** Phone number format issue

**Solution:**
- Make sure phone number contains only digits
- Format: `9999999999` (10 digits for India)

## Quick Test SQL

Run this in Supabase SQL Editor to add a test customer with birthday tomorrow:

```sql
-- Delete any existing test customers
DELETE FROM customers WHERE name = 'Test Customer';

-- Add test customer with birthday tomorrow
INSERT INTO customers (name, phone, birthday, notes) 
VALUES (
  'Test Customer',
  '9999999999',
  CURRENT_DATE + INTERVAL '1 day',  -- Birthday tomorrow
  'Test customer for greetings feature'
);

-- Verify it was added
SELECT * FROM customers WHERE name = 'Test Customer';
```

After running this, refresh the admin page and you should see the greeting button!
