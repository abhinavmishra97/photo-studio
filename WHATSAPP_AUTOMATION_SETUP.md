# WhatsApp Automation Setup Guide

This guide will help you set up automated WhatsApp messages for birthday and anniversary greetings using Twilio.

## 📋 Prerequisites

- Twilio account (free trial available)
- WhatsApp Business API access through Twilio
- Phone numbers stored in your customer database

---

## 🚀 Step-by-Step Setup

### Step 1: Create a Twilio Account

1. Go to [Twilio](https://www.twilio.com/try-twilio)
2. Sign up for a free account
3. Verify your email and phone number
4. You'll get **$15 free trial credit** (enough for ~1500 messages)

### Step 2: Set Up WhatsApp Sandbox (For Testing)

Twilio provides a WhatsApp Sandbox for testing before going to production.

1. In your Twilio Console, go to **Messaging** → **Try it out** → **Send a WhatsApp message**
2. You'll see a sandbox number (e.g., `+1 415 523 8886`)
3. **Join the sandbox** by sending a WhatsApp message:
   - Open WhatsApp on your phone
   - Send a message to the sandbox number with the code shown (e.g., "join <your-code>")
   - You'll receive a confirmation message

### Step 3: Get Your Twilio Credentials

1. Go to your [Twilio Console Dashboard](https://console.twilio.com/)
2. Find these credentials:
   - **Account SID** (starts with "AC...")
   - **Auth Token** (click to reveal)
   - **WhatsApp From Number** (the sandbox number, e.g., `whatsapp:+14155238886`)

### Step 4: Add Environment Variables

Add these to your `.env` file:

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

**Important:** Replace the values with your actual Twilio credentials.

### Step 5: Add to Vercel Environment Variables

For production deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the same three variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_FROM`
4. Make sure they're available for **Production**, **Preview**, and **Development**

### Step 6: Test Locally

1. Make sure your dev server is running:
   ```bash
   npm run dev
   ```

2. Test the WhatsApp function by creating a test customer with today's birthday:
   - Go to your admin panel
   - Add a customer with:
     - Name: "Test User"
     - Phone: Your WhatsApp number (format: +919876543210)
     - Birthday: Today's date
   
3. Manually trigger the cron job:
   ```bash
   curl -X GET "http://localhost:4321/api/cron/send-greetings" \
     -H "Authorization: Bearer your_cron_secret"
   ```

4. You should receive a WhatsApp message!

---

## 📱 Phone Number Format

The system automatically handles Indian phone numbers:

- ✅ `9876543210` → Converts to `+919876543210`
- ✅ `+919876543210` → Already correct
- ✅ `09876543210` → Removes leading 0, adds +91
- ✅ `919876543210` → Adds + prefix

For international numbers, use full E.164 format: `+[country_code][number]`

---

## 💬 Message Templates

### Birthday Message:
```
🎉 *Happy Birthday [Name]!* 🎂

Wishing you a day filled with joy, laughter, and wonderful memories!

May this year bring you success, happiness, and all the things you've been dreaming of.

Warm wishes from,
*Ram Photo Studio* 📸

_Capturing your precious moments since years!_
```

### Anniversary Message:
```
💕 *Happy Anniversary [Name] & [Spouse]!* 💑

Wishing you both a beautiful day filled with love and cherished memories!

May your bond grow stronger with each passing year, and may you continue to create wonderful moments together.

Warm wishes from,
*Ram Photo Studio* 📸

_Capturing your love story, one frame at a time!_
```

You can customize these messages in `src/lib/whatsapp.ts`

---

## 🔄 How It Works

1. **Daily Cron Job** runs at 9 AM IST (configured in `vercel.json`)
2. **Checks all customers** for birthdays/anniversaries matching today's date
3. **Sends WhatsApp messages** to customers with phone numbers
4. **Logs results** (success/failures) for monitoring

---

## 💰 Pricing

### Twilio WhatsApp Pricing (India):
- **Sandbox (Testing):** FREE
- **Production Messages:**
  - User-initiated: ₹0.40 per message
  - Business-initiated: ₹0.80 per message
  
### Free Trial:
- $15 credit (~1500 messages)
- Perfect for testing and small businesses

### Going to Production:

To send messages outside the sandbox, you need to:

1. **Apply for WhatsApp Business API access**
   - Go to Twilio Console → Messaging → WhatsApp
   - Click "Request Access"
   - Fill out the business verification form

2. **Get a dedicated WhatsApp number**
   - Purchase a Twilio phone number
   - Enable WhatsApp on it
   - Get it approved by Meta

3. **Submit message templates**
   - WhatsApp requires pre-approved templates for business-initiated messages
   - Submit your birthday/anniversary templates for approval

**Note:** For small businesses, the sandbox is often sufficient for testing. For production at scale, complete the business verification.

---

## 🧪 Testing Checklist

- [ ] Twilio account created
- [ ] WhatsApp sandbox joined
- [ ] Environment variables added to `.env`
- [ ] Environment variables added to Vercel
- [ ] Test customer created with today's birthday
- [ ] Cron job manually triggered
- [ ] WhatsApp message received successfully

---

## 🔧 Troubleshooting

### "Twilio is not configured" error
- Check that all three environment variables are set
- Restart your dev server after adding variables
- Verify the values are correct (no extra spaces)

### "Failed to send WhatsApp message" error
- Ensure you've joined the WhatsApp sandbox
- Check phone number format (should be E.164: +919876543210)
- Verify your Twilio account has credit
- Check Twilio Console → Logs for detailed errors

### Messages not sending in production
- Verify environment variables are set in Vercel
- Check Vercel deployment logs
- Ensure cron job is configured in `vercel.json`
- Check Twilio Console → Messaging → Logs

### Phone number format issues
- Use international format: +[country_code][number]
- For India: +91 followed by 10-digit number
- No spaces or special characters

---

## 📊 Monitoring

### Check Twilio Logs:
1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to **Monitor** → **Logs** → **Messaging**
3. View all sent messages, delivery status, and errors

### Check Vercel Logs:
1. Go to your Vercel project
2. Navigate to **Deployments** → Select deployment → **Functions**
3. Click on the cron function to see logs

---

## 🎯 Next Steps

1. **Set up Twilio account** and get credentials
2. **Add environment variables** to `.env` and Vercel
3. **Test with sandbox** using your own number
4. **Monitor first few automated sends** to ensure everything works
5. **Consider upgrading** to production WhatsApp API if needed

---

## 📚 Additional Resources

- [Twilio WhatsApp API Docs](https://www.twilio.com/docs/whatsapp)
- [Twilio Console](https://console.twilio.com/)
- [WhatsApp Business API Pricing](https://www.twilio.com/whatsapp/pricing)
- [E.164 Phone Number Format](https://www.twilio.com/docs/glossary/what-e164)

---

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review Twilio Console logs
3. Check Vercel function logs
4. Verify all environment variables are set correctly

**Your WhatsApp automation is ready to go!** 🎉
