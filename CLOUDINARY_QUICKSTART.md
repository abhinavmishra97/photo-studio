# 🚀 Cloudinary Quick Start - 5 Minutes Setup

## Step 1️⃣: Create Account (2 minutes)

1. Go to: **https://cloudinary.com/users/register_free**
2. Click **"Sign up with Google"** (fastest option)
3. Select your Google account
4. Fill in company name: **"Ram Photo Studio"**
5. Click **"Start Free"**

✅ Done! You now have a Cloudinary account.

---

## Step 2️⃣: Get Your Credentials (1 minute)

1. You'll see the **Dashboard** after signup
2. Look for **"Account Details"** section
3. You'll see three values:

```
Cloud Name:  dxyz1234abc          [Copy]
API Key:     123456789012345      [Copy]
API Secret:  ••••••••••••••••     [Show] [Copy]
```

4. **Copy all three values** to a notepad

---

## Step 3️⃣: Connect to Your Project (2 minutes)

### A. Install Package

Open terminal in your project and run:
```bash
npm install cloudinary
```

### B. Add Credentials

1. Open your `.env` file (you have it open already!)
2. Add these lines at the end:

```env
CLOUDINARY_CLOUD_NAME=paste_your_cloud_name_here
CLOUDINARY_API_KEY=paste_your_api_key_here
CLOUDINARY_API_SECRET=paste_your_api_secret_here
```

3. **Replace** the placeholder text with your actual values
4. **Save** the file (Ctrl + S)

### C. Restart Server

```bash
# Press Ctrl + C to stop
npm run dev
```

---

## Step 4️⃣: Test Upload

1. Open browser: **http://localhost:4321/upload-example**
2. Click **"Choose File"**
3. Select an image
4. Click **"Upload"**
5. Wait a few seconds
6. ✅ You'll see your uploaded image!

---

## 🎉 You're Done!

Your project is now connected to Cloudinary!

### What You Can Do Now:

✅ Upload images and videos  
✅ Get optimized URLs  
✅ Transform images (resize, crop, etc.)  
✅ Store unlimited media  
✅ Use CDN for fast delivery  

---

## 📚 Next Steps:

- Read **CLOUDINARY_COMPLETE_SETUP.md** for detailed guide
- Upload your gallery images via dashboard
- Integrate uploads into your admin panel
- Set up automatic image optimization

---

## 🆘 Need Help?

**Problem:** Upload not working?
- Check your `.env` file has correct credentials
- Make sure you restarted the dev server
- Check file size (max 100MB on free plan)

**Problem:** Can't find credentials?
- Go to: https://cloudinary.com/console
- Look for "Account Details" section
- Click "Show" next to API Secret

---

## 📞 Quick Links:

- **Dashboard:** https://cloudinary.com/console
- **Media Library:** https://cloudinary.com/console/media_library
- **Documentation:** https://cloudinary.com/documentation
- **Test Upload:** http://localhost:4321/upload-example

---

**Total Setup Time:** ~5 minutes  
**Difficulty:** Easy 😊  
**Cost:** Free (25GB storage + 25GB bandwidth/month)
