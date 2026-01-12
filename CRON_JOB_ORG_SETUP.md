# 📋 Cron-Job.org Setup Guide - Exact Settings

## Execution Schedule Section

### ✅ Select: "Every day at"
- **Time:** `08` : `00` (for 8:00 AM)
- **Important:** Make sure to select **IST timezone** in your account settings first!

**What you should see:**
- Next executions will show daily at 8:00 AM

---

## Schedule Expires Section

### ✅ Leave it OFF (toggle should be gray/disabled)
- You want this to run forever, not expire

---

## Notify Me When Section

### ✅ Toggle ON: "execution of the cronjob fails"
- **Notify after:** `1` failure
- This will email you if something goes wrong

### ✅ Toggle ON: "execution of the cronjob succeeds after it failed before"
- This tells you when it's working again after a failure

### ✅ Toggle ON: "the cronjob will be disabled because of too many failures"
- Important to know if it stops working

---

## Save Responses in Job History

### ✅ YES - Turn this ON!

**Why?**
- You can see the response from your API
- Helps with debugging
- Shows if emails were sent successfully
- You can check logs anytime

**What it will save:**
- Response status (200 OK, 401 Unauthorized, etc.)
- Response body (shows how many emails were sent)
- Execution time
- Any errors

---

## Complete Settings Summary

```
┌─────────────────────────────────────────┐
│ Execution Schedule                      │
├─────────────────────────────────────────┤
│ ○ Every 15 minutes                      │
│ ● Every day at: 08:00                   │ ← SELECT THIS
│ ○ Every 1. of the month                 │
│ ○ Every year on January 1               │
│ ○ Custom                                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Schedule Expires                        │
├─────────────────────────────────────────┤
│ ○ OFF                                   │ ← LEAVE OFF
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Notify Me When...                       │
├─────────────────────────────────────────┤
│ ● execution fails (after 1 failure)     │ ← TURN ON
│ ● succeeds after it failed before       │ ← TURN ON
│ ● disabled due to too many failures     │ ← TURN ON
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Save Responses in Job History           │
├─────────────────────────────────────────┤
│ ● YES - Turn this ON                    │ ← TURN ON
└─────────────────────────────────────────┘
```

---

## ⚠️ IMPORTANT: Timezone Setting

**Before saving, check your timezone!**

1. Look at the right side where it says "Next executions"
2. It currently shows times in **UTC**
3. You need to change this to **IST (Asia/Kolkata)**

**How to change timezone:**
1. Look for a timezone dropdown (usually near the schedule)
2. OR go to your account settings
3. Select: **Asia/Kolkata (IST)** or **UTC+5:30**

**Current issue in your screenshot:**
- Next executions show "4:00 PM" 
- This is because it's in UTC
- In IST, this would be 9:30 PM (not 8:00 AM!)

**Fix:**
- Change the time to `08:00` 
- Make sure timezone is set to IST/Asia/Kolkata
- Then "Next executions" should show "8:00 AM"

---

## Other Settings (On Previous Page)

Make sure you also set these (if you haven't already):

### URL
```
https://ramdigitalphotostudio.vercel.app/api/cron/send-greetings
```

### Request Method
```
GET
```

### Headers (VERY IMPORTANT!)
Add this header:
- **Name:** `Authorization`
- **Value:** `Bearer YOUR_CRON_SECRET_HERE`

(Replace `YOUR_CRON_SECRET_HERE` with your actual CRON_SECRET from .env file)

---

## After Saving

### Test It Immediately
1. After creating the cron job, click **"Execute now"** or **"Test"**
2. Wait 10-20 seconds
3. Check the response in job history
4. Should see: `{"success": true, "emailsSent": X}`
5. Check Resend dashboard for sent emails

### Monitor Job History
- Click on the job to see history
- You'll see all executions with responses
- Green = Success
- Red = Failed

---

## Expected Response (Success)

When it works, you should see:
```json
{
  "success": true,
  "date": "1/11",
  "emailsSent": 1,
  "emails": [
    "Birthday email to Customer Name (customer@email.com)"
  ]
}
```

## Expected Response (No Birthdays Today)

On days with no birthdays:
```json
{
  "success": true,
  "date": "1/12",
  "emailsSent": 0,
  "emails": []
}
```

---

## Quick Checklist

- [ ] Execution schedule: "Every day at 08:00"
- [ ] Timezone: IST/Asia/Kolkata (UTC+5:30)
- [ ] Schedule expires: OFF
- [ ] Notify on failure: ON
- [ ] Notify on success after failure: ON
- [ ] Notify on disable: ON
- [ ] Save responses: ON
- [ ] URL is correct
- [ ] Authorization header is set with CRON_SECRET
- [ ] Test execution works

---

## Need Your CRON_SECRET?

If you don't remember your CRON_SECRET, check your `.env` file:

```powershell
# In your project folder, run:
cat .env | Select-String "CRON_SECRET"
```

Or open `.env` file and copy the value after `CRON_SECRET=`

---

Let me know if you need help with any of these settings!
