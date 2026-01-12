## 🔍 Email Automation Debugging Checklist

### Current Status (as of Jan 11, 2026 - 1:08 AM IST)

**Cron Schedule:** `"30 19 * * *"`
- **Runs at:** 1:00 AM IST (19:30 UTC)
- **Last run:** Today at 1:00 AM IST (already happened!)

---

## ❓ Why Didn't You Get the Email?

Here are the possible reasons (check each one):

### 1. ✅ Check Vercel Logs (MOST IMPORTANT)

**Steps:**
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click **"Logs"** in the sidebar
4. Filter by: `/api/cron/send-greetings`
5. Look for logs from **today (Jan 11) around 1:00 AM IST**

**What to look for:**
- ✅ "Checking for events on 1/11" - Cron ran successfully
- ✅ "Birthday email sent to [name]" - Email was sent
- ❌ "Unauthorized" - CRON_SECRET is wrong
- ❌ "Database error" - Supabase connection failed
- ❌ "Failed to send email" - Resend API error
- ⚠️ No logs at all - Cron didn't run (environment issue)

---

### 2. ✅ Check Database (Customer Data)

**Run this in Supabase SQL Editor:**

\`\`\`sql
-- Check if customer exists with Jan 11 birthday AND email
SELECT 
  id,
  name,
  email,
  birthday,
  TO_CHAR(birthday, 'Month DD') as birthday_display,
  EXTRACT(MONTH FROM birthday) as birth_month,
  EXTRACT(DAY FROM birthday) as birth_day,
  CASE 
    WHEN email IS NULL OR email = '' THEN '❌ NO EMAIL - Cannot send'
    ELSE '✅ Has email: ' || email
  END as email_status
FROM customers
WHERE 
  EXTRACT(MONTH FROM birthday) = 1 
  AND EXTRACT(DAY FROM birthday) = 11;
\`\`\`

**Requirements for email to send:**
- ✅ Customer exists with birthday on Jan 11
- ✅ Customer has `email` field filled (not null, not empty)
- ✅ Birthday is in correct format (YYYY-MM-DD)

---

### 3. ✅ Check Resend Dashboard

**Steps:**
1. Go to: https://resend.com/emails
2. Check emails sent **today (Jan 11)**
3. Look for emails sent around **1:00 AM IST**

**What to check:**
- ✅ Email was sent successfully
- ❌ Email bounced (invalid email address)
- ❌ Email in spam folder
- ❌ No emails sent (means cron didn't trigger or no matching customers)

---

### 4. ✅ Check Vercel Environment Variables

**Steps:**
1. Go to: Vercel Dashboard → Your Project
2. Click **Settings** → **Environment Variables**
3. Verify these exist:

**Required Variables:**
- ✅ `RESEND_API_KEY` (starts with `re_`)
- ✅ `CRON_SECRET` (your secret key)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (for database access)
- ✅ `PUBLIC_SUPABASE_URL` (your Supabase URL)

**If any are missing, the cron will fail silently!**

---

### 5. ✅ Check Vercel Cron Jobs

**Steps:**
1. Go to: Vercel Dashboard → Your Project
2. Click **Cron Jobs** in sidebar
3. Check if `send-greetings` is listed
4. Check last run time and status

**What to verify:**
- ✅ Cron job exists and is enabled
- ✅ Last run shows today's date
- ✅ Status is "Success" (not "Failed")

---

## 🧪 Manual Test (Do This Now!)

Since the cron already ran at 1:00 AM, let's manually trigger it to test:

### Option A: Trigger in Vercel Dashboard (Recommended)

1. Go to: Vercel Dashboard → Your Project → **Cron Jobs**
2. Find `send-greetings`
3. Click **"Run"** button
4. Wait 10-20 seconds
5. Check **Logs** to see the result
6. Check your email inbox

### Option B: Test Locally

\`\`\`powershell
# First, check if you have environment variables
$env:RESEND_API_KEY
$env:CRON_SECRET

# If they show values, test the endpoint:
curl -X GET http://localhost:4321/api/cron/send-greetings `
  -H "Authorization: Bearer YOUR_CRON_SECRET_HERE"
\`\`\`

---

## 🎯 Most Likely Issues

Based on common problems, here's what's probably wrong:

### Issue #1: Customer Has No Email Address
**Probability:** 🔴 HIGH (80%)
- The customer in database doesn't have email field filled
- **Fix:** Add email to customer in admin panel

### Issue #2: Environment Variables Not Set in Vercel
**Probability:** 🟡 MEDIUM (15%)
- RESEND_API_KEY or CRON_SECRET missing in Vercel
- **Fix:** Add them in Vercel Settings → Environment Variables

### Issue #3: Resend Domain Not Verified
**Probability:** 🟡 MEDIUM (10%)
- Using custom domain that's not verified
- **Fix:** Use `onboarding@resend.dev` or verify your domain

### Issue #4: Wrong Date Format in Database
**Probability:** 🟢 LOW (5%)
- Birthday stored in wrong format
- **Fix:** Ensure format is YYYY-MM-DD (e.g., 2000-01-11)

---

## 📋 Quick Action Plan

**Do these in order:**

1. **Check Vercel Logs** (5 minutes)
   - This will tell you exactly what happened

2. **Check Database** (2 minutes)
   - Run the SQL query above
   - Verify customer has email

3. **Manually Trigger Cron** (2 minutes)
   - Use Vercel Dashboard to run it now
   - Check if email arrives

4. **Check Resend Dashboard** (2 minutes)
   - See if any emails were sent
   - Check for errors

---

## 🔧 If You Want to Test Right Now

The cron is scheduled for **1:00 AM IST** (already passed today).

**Next scheduled run:** Tomorrow (Jan 12) at 1:00 AM IST

**To test immediately:**
- Use Vercel Dashboard → Cron Jobs → Click "Run"
- OR change cron schedule to run in next few minutes (not recommended)

---

## 📞 Next Steps

**Tell me:**
1. What do you see in **Vercel Logs**?
2. Does the customer have an **email address** in the database?
3. What happens when you **manually trigger** the cron in Vercel?

This will help me pinpoint the exact issue!
