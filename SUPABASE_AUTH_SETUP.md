# Supabase Authentication Setup Guide

This guide will help you set up authentication for the admin dashboard.

## Step 1: Enable Email Authentication in Supabase

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Authentication** → **Providers**
3. Make sure **Email** provider is enabled (it should be enabled by default)
4. Scroll down to **Email Auth** settings and ensure:
   - "Enable email confirmations" is **DISABLED** (for easier admin setup)
   - Or if you want email confirmations, make sure you have SMTP configured

## Step 2: Create Your Admin User

### Option A: Using Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users** in your Supabase dashboard
2. Click **Add user** → **Create new user**
3. Enter your admin email and password:
   - Email: `your-admin-email@example.com`
   - Password: `YourSecurePassword123!`
4. Click **Create user**
5. The user will be created and you can immediately log in

### Option B: Using SQL Editor

1. Go to **SQL Editor** in your Supabase dashboard
2. Run this SQL command (replace with your email and password):

```sql
-- Create admin user
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'your-admin-email@example.com',
    crypt('YourSecurePassword123!', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
);
```

**Note:** Replace `your-admin-email@example.com` and `YourSecurePassword123!` with your actual credentials.

## Step 3: Test the Login

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:4321/admin/login`

3. Enter the email and password you created

4. You should be redirected to the admin dashboard at `/admin`

## Step 4: Security Best Practices

### 1. Use Strong Passwords
- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Don't use common words or patterns

### 2. Enable Row Level Security (RLS) for Admin Protection

Run this SQL in your Supabase SQL Editor to ensure only authenticated users can access admin data:

```sql
-- Enable RLS on enquiries table
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (admins)
CREATE POLICY "Allow authenticated users to read enquiries"
ON enquiries FOR SELECT
TO authenticated
USING (true);

-- Allow public to insert enquiries (from contact form)
CREATE POLICY "Allow public to insert enquiries"
ON enquiries FOR INSERT
TO anon
WITH CHECK (true);

-- Enable RLS on customers table
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (admins) - full access
CREATE POLICY "Allow authenticated users full access to customers"
ON customers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

### 3. Add More Admin Users (Optional)

To add additional admin users, repeat Step 2 with different email addresses.

## Troubleshooting

### "Invalid email or password" error
- Double-check your email and password
- Make sure the user was created successfully in Supabase
- Check that email confirmations are disabled (or email is confirmed)

### Redirected back to login after signing in
- Check browser console for errors
- Verify your Supabase environment variables are correct in `.env`
- Make sure cookies are enabled in your browser

### "Missing Supabase environment variables" error
- Verify your `.env` file has:
  ```
  PUBLIC_SUPABASE_URL=your-project-url
  PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  ```

## How It Works

1. **Login Page** (`/admin/login`): Users enter email and password
2. **Middleware** (`src/middleware.ts`): Checks authentication on all `/admin/*` routes
3. **Session Management**: Uses cookies to maintain login state
4. **Logout** (`/admin/logout`): Clears session and redirects to login

## Next Steps

- ✅ Create your admin user in Supabase
- ✅ Test login at `/admin/login`
- ✅ Access admin dashboard at `/admin`
- ✅ Enable RLS policies for security
- 🔒 Consider adding 2FA for extra security (Supabase supports this)

---

**Need help?** Check the Supabase documentation: https://supabase.com/docs/guides/auth
