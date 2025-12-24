# Quick Reference - Supabase Backend

## 🔗 Important URLs

**Supabase Dashboard:** https://supabase.com/dashboard
**Admin Enquiries Page:** http://localhost:4321/admin/enquiries (development)
**Contact Form:** http://localhost:4321/contact

---

## 📝 Quick Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 🗂️ File Structure

```
src/
├── lib/
│   ├── supabase.ts          # Public client (contact form)
│   └── supabaseAdmin.ts     # Admin client (server-side only)
├── types/
│   └── enquiry.ts           # TypeScript types
├── pages/
│   ├── contact.astro        # Contact form with Supabase integration
│   └── admin/
│       └── enquiries.astro  # Admin dashboard
```

---

## 🔑 Environment Variables

Located in `.env` file (root directory):

```env
PUBLIC_SUPABASE_URL=your-project-url
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Remember:** Never commit `.env` to git!

---

## 📊 Database Table: `enquiries`

| Column     | Type      | Description                    |
|------------|-----------|--------------------------------|
| id         | UUID      | Auto-generated unique ID       |
| name       | TEXT      | Customer name                  |
| email      | TEXT      | Customer email                 |
| phone      | TEXT      | Customer phone number          |
| message    | TEXT      | Enquiry message                |
| status     | TEXT      | new/contacted/resolved/spam    |
| created_at | TIMESTAMP | Auto-generated submission time |

---

## 🎯 Status Values

- `new` - Fresh enquiry, not yet contacted
- `contacted` - Customer has been reached out to
- `resolved` - Enquiry completed/closed
- `spam` - Marked as spam/invalid

---

## 🛠️ Common Tasks

### View All Enquiries
1. Go to Supabase Dashboard → Table Editor → enquiries
2. Or visit: http://localhost:4321/admin/enquiries

### Update Enquiry Status
1. Supabase Dashboard → Table Editor → enquiries
2. Click on the row → Edit → Change status → Save

### Export Enquiries
1. Supabase Dashboard → Table Editor → enquiries
2. Click "Download as CSV" button

### Delete Spam Enquiries
1. Supabase Dashboard → Table Editor → enquiries
2. Select row(s) → Delete

---

## 🔒 Security Reminders

✅ **Safe to expose:**
- PUBLIC_SUPABASE_URL
- PUBLIC_SUPABASE_ANON_KEY

❌ **NEVER expose:**
- SUPABASE_SERVICE_ROLE_KEY (server-side only!)

---

## 📱 Quick Actions from Admin Page

**Email Reply:**
- Click "Email" button
- Opens default email client with customer's email pre-filled

**WhatsApp Chat:**
- Click "WhatsApp" button
- Opens WhatsApp Web/App with customer's number

---

## 🐛 Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify .env file has correct values
- Restart dev server

**Admin page empty?**
- Check Supabase dashboard to verify enquiries exist
- Verify SUPABASE_SERVICE_ROLE_KEY is correct

**"Missing environment variables" error?**
- Ensure .env file exists in project root
- Check all three variables are set
- Restart dev server

---

## 📞 Contact Form Fields

Required fields:
- Name
- Email
- Phone
- Message

All fields are validated before submission.

---

## 🎨 Admin Dashboard Features

- ✅ Latest enquiries first
- ✅ Color-coded status badges
- ✅ One-click email/WhatsApp
- ✅ Full message display
- ✅ Timestamp formatting
- ✅ Responsive design

---

## 🚀 Production Deployment

Before deploying:
1. Set environment variables in your hosting platform
2. Use production Supabase URL and keys
3. Test contact form in production
4. Secure admin page (add authentication)

---

## 📚 Documentation

- **Supabase Docs:** https://supabase.com/docs
- **Astro Docs:** https://docs.astro.build
- **Setup Guide:** See SUPABASE_SETUP_GUIDE.md

---

**Last Updated:** December 2024
