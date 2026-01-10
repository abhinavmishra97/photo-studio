# Automated Birthday & Anniversary Email System

## 📧 Overview
This system automatically sends birthday and anniversary greeting emails to customers at 8:00 AM IST every day.

## 🚀 Setup Instructions

### 1. Add Email Column to Supabase Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Add email column to customers table
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Optional: Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
```

### 2. Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (3,000 emails/month free)
3. Verify your email
4. Go to API Keys section
5. Create a new API key
6. Copy the API key (starts with `re_`)

### 3. Configure Domain (Important!)

**Option A: Use Resend's Testing Domain (Quick Start)**
- You can send emails immediately using `onboarding@resend.dev`
- Limited to 100 emails/day
- Good for testing

**Option B: Add Your Own Domain (Recommended for Production)**
1. Go to Domains in Resend dashboard
2. Add your domain (e.g., `ramdigitalphotostudio.com`)
3. Add the DNS records they provide to your domain registrar
4. Wait for verification (usually 5-30 minutes)
5. Update the `from` email in `send-greetings.ts` to use your domain

### 4. Set Environment Variables

Add these to your `.env` file:

```env
RESEND_API_KEY=re_your_actual_api_key_here
CRON_SECRET=generate_a_random_long_string_here
```

**To generate a secure CRON_SECRET**, run this in PowerShell:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### 5. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add:
   - `RESEND_API_KEY` = your Resend API key
   - `CRON_SECRET` = your generated secret
4. Make sure to add them for all environments (Production, Preview, Development)

### 6. Deploy to Vercel

```bash
git add .
git commit -m "Add automated birthday/anniversary email system"
git push
```

Vercel will automatically deploy and set up the cron job.

## 📅 How It Works

1. **Daily Check**: Every day at 8:00 AM IST (2:30 AM UTC), Vercel Cron triggers the endpoint
2. **Database Query**: The system fetches all customers from Supabase
3. **Date Matching**: Checks if today matches any customer's birthday or anniversary
4. **Email Sending**: Sends personalized emails to matching customers
5. **Logging**: Records all sent emails and any errors

## 🎨 Email Templates

### Birthday Email
- Golden gradient header with 🎉
- Personalized greeting
- Warm birthday wishes
- Ram Photo Studio branding

### Anniversary Email
- Pink gradient header with 💕
- Personalized greeting (includes spouse name if available)
- Romantic anniversary wishes
- Ram Photo Studio branding

## 🧪 Testing

### Test Locally
```bash
# Make sure you have the environment variables set
# Then make a request to the endpoint with the secret

curl -X GET http://localhost:4321/api/cron/send-greetings \
  -H "Authorization: Bearer your_cron_secret_here"
```

### Test on Vercel
After deployment, you can manually trigger the cron:
1. Go to Vercel Dashboard → Your Project → Cron Jobs
2. Find the `send-greetings` job
3. Click "Run" to test immediately

## 📊 Monitoring

### View Logs
1. Go to Vercel Dashboard → Your Project
2. Click on "Logs" or "Functions"
3. Filter by `/api/cron/send-greetings`
4. You'll see:
   - ✅ Successfully sent emails
   - ❌ Any errors
   - 📊 Summary of emails sent each day

### Check Email Delivery
1. Go to [Resend Dashboard](https://resend.com/emails)
2. View all sent emails
3. Check delivery status, opens, clicks, etc.

## 🔧 Customization

### Change Email Time
Edit `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/send-greetings",
      "schedule": "30 2 * * *"  // Change this cron expression
    }
  ]
}
```

Cron format: `minute hour day month dayOfWeek`
- `30 2 * * *` = 2:30 AM UTC = 8:00 AM IST
- `0 3 * * *` = 3:00 AM UTC = 8:30 AM IST
- `30 1 * * *` = 1:30 AM UTC = 7:00 AM IST

### Customize Email Content
Edit `src/lib/emailTemplates.ts` to change:
- Email design
- Message text
- Colors
- Branding

### Change Sender Email
Edit `src/pages/api/cron/send-greetings.ts`:
```typescript
from: 'Ram Photo Studio <noreply@yourdomain.com>',
```

## 🎯 Customer Data Requirements

For emails to be sent, customers need:
- **Email address** (required)
- **Birthday** or **Anniversary** date (at least one)
- **Name** (for personalization)

## 🔒 Security

- Cron endpoint is protected by `CRON_SECRET`
- Only Vercel Cron (with correct secret) can trigger it
- Resend API key is stored securely in environment variables
- No sensitive data is logged

## 💰 Cost

### Resend Free Tier
- 3,000 emails/month
- 100 emails/day
- Perfect for small to medium customer bases

### If You Need More
- Resend Pro: $20/month for 50,000 emails
- Or use alternative services (SendGrid, AWS SES, etc.)

## 🐛 Troubleshooting

### Emails Not Sending
1. Check Vercel logs for errors
2. Verify `RESEND_API_KEY` is set correctly
3. Check if domain is verified (if using custom domain)
4. Ensure customer has valid email address

### Cron Not Running
1. Check `vercel.json` is committed and deployed
2. Verify cron schedule is correct
3. Check Vercel Dashboard → Cron Jobs

### Wrong Time
- Remember: Cron uses UTC time
- IST = UTC + 5:30
- Adjust cron schedule accordingly

## 📞 Support

For issues:
1. Check Vercel logs
2. Check Resend dashboard
3. Review this documentation
4. Check Supabase database for customer data

## ✅ Checklist

- [ ] SQL: Added email column to customers table
- [ ] Resend: Created account and got API key
- [ ] Resend: Verified domain (or using test domain)
- [ ] Local: Added RESEND_API_KEY to .env
- [ ] Local: Added CRON_SECRET to .env
- [ ] Vercel: Added environment variables
- [ ] Git: Committed and pushed changes
- [ ] Vercel: Deployment successful
- [ ] Test: Manually triggered cron job
- [ ] Test: Verified email received
- [ ] Monitor: Checked logs for any errors
