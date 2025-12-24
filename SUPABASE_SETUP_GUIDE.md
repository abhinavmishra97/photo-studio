# Supabase Backend Setup Guide
## Ram Digital Photo Studio - Contact Form & Enquiries Management

---

## 📋 Overview

This guide will help you set up the Supabase backend for handling contact form submissions and viewing enquiries.

**What's included:**
- Contact form submissions stored in Supabase
- Admin dashboard to view and manage enquiries
- Email and WhatsApp quick actions
- Row Level Security (RLS) for data protection

---

## 🚀 Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project name**: `ram-photo-studio` (or your choice)
   - **Database password**: Create a strong password (save it!)
   - **Region**: Choose closest to India (e.g., Mumbai or Singapore)
   - **Pricing plan**: Free tier is sufficient
5. Click "Create new project"
6. Wait 2-3 minutes for project to be ready

---

## 🗄️ Step 2: Set Up Database

1. In your Supabase project dashboard, click on **SQL Editor** in the left sidebar
2. Click "New query"
3. Copy the entire contents of `supabase-setup.sql` file
4. Paste it into the SQL editor
5. Click "Run" (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned" message

**What this does:**
- Creates `enquiries` table with all required columns
- Sets up indexes for better performance
- Enables Row Level Security (RLS)
- Creates policies:
  - Public users can INSERT (submit forms)
  - Service role can SELECT and UPDATE (admin access)

---

## 🔑 Step 3: Get Your API Keys

1. In Supabase dashboard, click **Settings** (gear icon) in the left sidebar
2. Click **API** under Project Settings
3. You'll see three important values:

### Copy these values:

**Project URL:**
```
https://your-project-id.supabase.co
```

**anon public (public key):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**service_role (secret key - NEVER expose to client!):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚙️ Step 4: Configure Environment Variables

1. In your project root, create a file named `.env`
2. Copy the contents from `.env.example`
3. Replace the placeholder values with your actual Supabase credentials:

```env
# Supabase Configuration
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important:**
- Replace `your-project-id` with your actual project ID
- Replace `your-anon-key-here` with the anon public key
- Replace `your-service-role-key-here` with the service_role key
- **NEVER** commit `.env` to git (it's already in `.gitignore`)

---

## 📦 Step 5: Install Dependencies

The Supabase client library should already be installed. If not, run:

```bash
npm install @supabase/supabase-js
```

---

## 🧪 Step 6: Test the Setup

### Test Contact Form:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact page: `http://localhost:4321/contact`

3. Fill out the form with test data:
   - Name: Test User
   - Email: test@example.com
   - Phone: +91 9876543210
   - Message: This is a test enquiry

4. Click "Send message"

5. You should see a green success message

### Verify in Supabase:

1. Go to your Supabase dashboard
2. Click **Table Editor** in the left sidebar
3. Select `enquiries` table
4. You should see your test submission!

---

## 👨‍💼 Step 7: Access Admin Dashboard

### Option 1: Supabase Dashboard (Recommended for now)

1. Go to your Supabase project
2. Click **Table Editor**
3. Select `enquiries` table
4. View all submissions, filter, and export data

### Option 2: Custom Admin Page

1. Navigate to: `http://localhost:4321/admin/enquiries`
2. You'll see all enquiries with:
   - Name, email, phone, message
   - Timestamp
   - Status badge
   - Quick action buttons:
     - **Email** - Opens mailto: link
     - **WhatsApp** - Opens WhatsApp chat
   - Status update buttons

**Note:** Status updates from the admin page currently won't work due to RLS policies. Use Supabase dashboard to update status, or we can add a server API endpoint later.

---

## 🔒 Security Notes

### What's Protected:

✅ **Public users can only:**
- Submit new enquiries (INSERT)
- Cannot read, update, or delete anything

✅ **Service role (admin) can:**
- Read all enquiries
- Update status
- Access is server-side only

✅ **Environment variables:**
- `PUBLIC_SUPABASE_URL` - Safe to expose
- `PUBLIC_SUPABASE_ANON_KEY` - Safe to expose (limited by RLS)
- `SUPABASE_SERVICE_ROLE_KEY` - **NEVER expose to client!**

### Best Practices:

- Never commit `.env` file
- Never use service role key in client-side code
- Always use server-side code (Astro pages, API routes) for admin operations
- Regularly review enquiries for spam

---

## 📊 Database Schema

```sql
Table: enquiries
├── id (uuid, primary key)
├── name (text, required)
├── email (text, required)
├── phone (text, required)
├── message (text, required)
├── status (text, default: 'new')
│   └── Options: 'new', 'contacted', 'resolved', 'spam'
└── created_at (timestamp, auto-generated)
```

---

## 🎯 Features Implemented

### Contact Form (`/contact`):
- ✅ Name, email, phone, message fields
- ✅ Form validation
- ✅ Submit to Supabase
- ✅ Success/error messages
- ✅ Loading states
- ✅ Form reset after submission
- ✅ Responsive design

### Admin Dashboard (`/admin/enquiries`):
- ✅ List all enquiries (latest first)
- ✅ View full details
- ✅ Status badges (new, contacted, resolved, spam)
- ✅ Email reply button (mailto:)
- ✅ WhatsApp chat button (wa.me)
- ✅ Formatted timestamps
- ✅ Responsive design

---

## 🔧 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file exists in project root
- Check that all three variables are set correctly
- Restart dev server after changing `.env`

### Form submission fails
- Check browser console for errors
- Verify Supabase project is active
- Check RLS policies are created correctly
- Ensure anon key is correct

### Admin page shows no enquiries
- Verify service role key is correct
- Check that enquiries exist in database
- Look for errors in browser console

### Status update doesn't work
- This is expected - use Supabase dashboard for now
- Or we can create a server API endpoint later

---

## 🚀 Next Steps (Optional Enhancements)

1. **Email Notifications**
   - Set up Supabase Edge Functions
   - Send email to admin when new enquiry arrives

2. **Status Update API**
   - Create Astro API route for status updates
   - Use service role key server-side

3. **Admin Authentication**
   - Add simple password protection to admin page
   - Or use Supabase Auth for proper login

4. **Export Functionality**
   - Add CSV export button
   - Download enquiries as spreadsheet

5. **Analytics**
   - Track enquiry sources
   - Response time metrics
   - Conversion tracking

---

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review Supabase documentation: https://supabase.com/docs
3. Check browser console for error messages
4. Verify all environment variables are set correctly

---

## ✅ Checklist

- [ ] Supabase project created
- [ ] SQL script executed successfully
- [ ] API keys copied
- [ ] `.env` file created and configured
- [ ] Dependencies installed
- [ ] Contact form tested and working
- [ ] Test enquiry visible in Supabase dashboard
- [ ] Admin page accessible
- [ ] Email and WhatsApp buttons working

---

**Congratulations! Your Supabase backend is now set up! 🎉**
