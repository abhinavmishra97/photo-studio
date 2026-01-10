# 🎉 Automated Email System - Quick Start

## ✅ What's Been Done

1. ✅ Added `email` field to Customer type
2. ✅ Installed Resend package (npm install resend)
3. ✅ Created email service configuration (`src/lib/resend.ts`)
4. ✅ Created beautiful HTML email templates (`src/lib/emailTemplates.ts`)
5. ✅ Created API endpoint for sending emails (`src/pages/api/cron/send-greetings.ts`)
6. ✅ Created Vercel cron configuration (`vercel.json`)
7. ✅ Updated admin form to include email field
8. ✅ Updated JavaScript to handle email field

## 🚀 Next Steps (You Need to Do)

### 1. Add Email Column to Supabase Database

Go to your Supabase SQL Editor and run:

```sql
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS email TEXT;
```

### 2. Get Resend API Key

1. Go to https://resend.com
2. Sign up (free - 3,000 emails/month)
3. Verify your email
4. Go to API Keys → Create API Key
5. Copy the key (starts with `re_`)

### 3. Add Environment Variables

Add to your `.env` file:

```env
RESEND_API_KEY=re_your_actual_key_here
CRON_SECRET=your_random_secret_here
```

**Generate CRON_SECRET** in PowerShell:
```powershell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### 4. Add to Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `RESEND_API_KEY` = your Resend API key
   - `CRON_SECRET` = your generated secret
3. Add for all environments (Production, Preview, Development)

### 5. Deploy

```bash
git add .
git commit -m "Add automated birthday/anniversary email system"
git push
```

## 📧 How It Works

- **Daily at 8:00 AM IST**: Vercel Cron triggers the endpoint
- **Checks Database**: Finds customers with birthdays/anniversaries today
- **Sends Emails**: Beautiful HTML emails with personalized greetings
- **Logs Results**: All activity is logged in Vercel

## 🎨 Email Templates

### Birthday Email
- Golden gradient header 🎉
- Warm birthday wishes
- Ram Photo Studio branding

### Anniversary Email
- Pink gradient header 💕
- Romantic anniversary message
- Includes spouse name if available

## 📝 Using the System

1. **Add Customer** in admin panel
2. **Fill in Email** (optional but needed for automated emails)
3. **Add Birthday/Anniversary** dates
4. **Save** - System will automatically send emails on those dates!

## 🔍 Testing

### Test Locally
```bash
curl -X GET http://localhost:4321/api/cron/send-greetings \
  -H "Authorization: Bearer your_cron_secret"
```

### Test on Vercel
1. Vercel Dashboard → Cron Jobs
2. Find `send-greetings`
3. Click "Run" to test

## 📊 Monitoring

- **Vercel Logs**: See all cron executions
- **Resend Dashboard**: Track email delivery, opens, etc.

## 📖 Full Documentation

See `EMAIL_SYSTEM_SETUP.md` for complete details, troubleshooting, and customization options.

## ⚠️ Important Notes

1. **Domain Setup**: For production, add your domain to Resend (optional but recommended)
2. **Free Tier**: 3,000 emails/month, 100/day - perfect for most use cases
3. **Security**: Cron endpoint is protected by CRON_SECRET
4. **Privacy**: Email addresses are stored securely in Supabase

## 🎯 What Customers Need

For automated emails to work, customers need:
- ✅ Email address
- ✅ Birthday OR Anniversary date
- ✅ Name (for personalization)

That's it! The system handles the rest automatically.

---

**Questions?** Check `EMAIL_SYSTEM_SETUP.md` for detailed documentation.
