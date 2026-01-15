# 🚀 Quick Start: WhatsApp Automation

Get your WhatsApp automation up and running in 15 minutes!

## ⚡ Fast Track Setup

### 1️⃣ Create Twilio Account (5 min)

1. Go to **https://www.twilio.com/try-twilio**
2. Sign up (you'll get $15 free credit)
3. Verify your email and phone

### 2️⃣ Set Up WhatsApp Sandbox (3 min)

1. In Twilio Console, go to: **Messaging** → **Try it out** → **Send a WhatsApp message**
2. You'll see instructions like:
   ```
   Send "join <code>" to +1 415 523 8886
   ```
3. Open WhatsApp on your phone
4. Send that message to the number shown
5. You'll get a confirmation ✅

### 3️⃣ Get Your Credentials (2 min)

From **Twilio Console Dashboard**:
- Copy **Account SID** (starts with "AC...")
- Copy **Auth Token** (click eye icon to reveal)
- Copy **WhatsApp From Number** (e.g., `whatsapp:+14155238886`)

### 4️⃣ Add to .env File (1 min)

Open your `.env` file and add:

```env
TWILIO_ACCOUNT_SID=AC1234567890abcdef1234567890abcd
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

Replace with your actual values!

### 5️⃣ Test It! (4 min)

**Option A: Use Test Script**
```bash
# Edit test-whatsapp.js and change the phone number to yours
# Then run:
node test-whatsapp.js
```

**Option B: Manual Test via Cron**
```bash
# Make sure dev server is running
npm run dev

# In another terminal, trigger the cron job:
curl -X GET "http://localhost:4321/api/cron/send-greetings" \
  -H "Authorization: Bearer your_cron_secret"
```

### 6️⃣ Deploy to Vercel (1 min)

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these three variables:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_FROM`
3. Push your code to GitHub
4. Vercel auto-deploys ✅

---

## 📱 Test Message Format

When you test, you should receive messages like this:

**Birthday:**
```
🎉 *Happy Birthday John!* 🎂

Wishing you a day filled with joy, laughter, and wonderful memories!

May this year bring you success, happiness, and all the things you've been dreaming of.

Warm wishes from,
*Ram Photo Studio* 📸

_Capturing your precious moments since years!_
```

---

## ✅ Verification Checklist

- [ ] Twilio account created
- [ ] WhatsApp sandbox joined (sent "join" message)
- [ ] Got Account SID, Auth Token, and From Number
- [ ] Added to `.env` file
- [ ] Tested locally (received WhatsApp message)
- [ ] Added to Vercel environment variables
- [ ] Deployed to production

---

## 🆘 Quick Troubleshooting

### "Twilio is not configured" error
→ Check `.env` file has all three variables
→ Restart dev server: `Ctrl+C` then `npm run dev`

### "Failed to send WhatsApp message"
→ Did you join the WhatsApp sandbox?
→ Is your phone number in E.164 format? (+919876543210)
→ Check Twilio Console → Logs for details

### Not receiving messages
→ Verify you joined the sandbox correctly
→ Check if your number is correct in the test
→ Look at Twilio Console → Messaging → Logs

---

## 💡 Pro Tips

1. **Save Twilio Credentials Safely**
   - Never commit `.env` to Git
   - Use Vercel for production secrets

2. **Test with Your Own Number First**
   - Join the sandbox with your WhatsApp
   - Send test messages to yourself
   - Verify formatting and content

3. **Monitor Twilio Logs**
   - Check delivery status
   - See any errors
   - Track message costs

4. **Phone Number Format**
   - Indian: `+919876543210`
   - Always include country code
   - No spaces or dashes

---

## 📊 What Happens Next?

Once set up, your system will:

1. **Run daily at 9 AM IST** (configured in `vercel.json`)
2. **Check all customers** for today's birthdays/anniversaries
3. **Send WhatsApp messages** automatically
4. **Log results** for monitoring

---

## 🎯 Next Steps After Setup

1. **Add Real Customer Data**
   - Go to `/admin` dashboard
   - Add customers with phone numbers
   - Include birthdays and anniversaries

2. **Test with Real Date**
   - Add a customer with today's birthday
   - Wait for 9 AM or manually trigger cron
   - Verify message is sent

3. **Monitor First Week**
   - Check Twilio logs daily
   - Verify messages are being sent
   - Ensure no errors

4. **Consider Production WhatsApp API**
   - If you need to send to many customers
   - Apply for WhatsApp Business API
   - Get approved message templates

---

## 💰 Cost Estimate

With Twilio's free trial:
- **$15 credit** = ~1,500 messages
- Perfect for testing and small businesses

After trial:
- **₹0.80 per message** (India)
- 100 customers = ~8 messages/month = ~₹6.40/month
- Very affordable! 💚

---

## 📚 Full Documentation

For detailed information, see:
- **WHATSAPP_AUTOMATION_SETUP.md** - Complete setup guide
- **WHATSAPP_IMPLEMENTATION_SUMMARY.md** - Technical details
- **test-whatsapp.js** - Test script

---

**You're all set!** 🎉

Your WhatsApp automation will now send personalized greetings to your customers automatically. Much better than email! 📱💚
