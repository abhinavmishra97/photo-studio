# 🎯 Complete Cloudinary Setup Guide - Step by Step

This guide covers **EVERYTHING** you need to know about setting up and using Cloudinary with your photo studio project.

---

## 📋 Table of Contents
1. [Creating a Cloudinary Account](#1-creating-a-cloudinary-account)
2. [Getting Your API Credentials](#2-getting-your-api-credentials)
3. [Connecting to Your Project](#3-connecting-to-your-project)
4. [Uploading Media via Dashboard](#4-uploading-media-via-cloudinary-dashboard)
5. [Uploading Media via Your App](#5-uploading-media-via-your-app)
6. [Managing Your Media](#6-managing-your-media)
7. [Advanced Features](#7-advanced-features)
8. [Best Practices](#8-best-practices)

---

## 1. Creating a Cloudinary Account

### Step 1.1: Sign Up
1. Open your browser and go to: **https://cloudinary.com/users/register_free**
2. You'll see a signup form with three options:
   - Sign up with Google (Recommended - fastest)
   - Sign up with GitHub
   - Sign up with Email

3. **Choose your method:**
   - **Option A - Google:** Click "Sign up with Google" → Select your Google account → Done!
   - **Option B - GitHub:** Click "Sign up with GitHub" → Authorize → Done!
   - **Option C - Email:** Fill in:
     - First Name
     - Last Name
     - Email Address
     - Password (min 8 characters)
     - Click "Sign up"

4. **Verify your email** (if you used email signup):
   - Check your inbox
   - Click the verification link
   - You'll be redirected to Cloudinary

### Step 1.2: Complete Your Profile
1. After signing up, you'll be asked to complete your profile:
   - **Company/Project Name:** Enter "Ram Photo Studio" (or your studio name)
   - **Role:** Select "Developer" or "Business Owner"
   - **Use Case:** Select "Media Management" or "E-commerce"
   - Click "Continue"

2. **Choose your plan:**
   - Select **"Free Plan"** (includes):
     - ✅ 25 GB storage
     - ✅ 25 GB bandwidth/month
     - ✅ Unlimited transformations
     - ✅ All core features
   - Click "Start Free"

3. **You're in!** You'll be redirected to your Dashboard

---

## 2. Getting Your API Credentials

### Step 2.1: Access Your Dashboard
1. After login, you'll see the **Dashboard** (main page)
2. Look for the **"Account Details"** section (usually top-right or center)

### Step 2.2: Find Your Credentials
You'll see three important values:

```
┌─────────────────────────────────────┐
│      Account Details                │
├─────────────────────────────────────┤
│ Cloud Name:    dxyz1234abc          │
│ API Key:       123456789012345      │
│ API Secret:    ••••••••••••••••     │
│                [Show] [Copy]        │
└─────────────────────────────────────┘
```

### Step 2.3: Copy Your Credentials
1. **Cloud Name:**
   - Click the "Copy" button next to Cloud Name
   - Save it in a notepad temporarily

2. **API Key:**
   - Click the "Copy" button next to API Key
   - Save it in your notepad

3. **API Secret:**
   - Click "Show" to reveal the secret
   - Click "Copy" button
   - Save it in your notepad

⚠️ **IMPORTANT:** Keep these credentials **SECRET**! Never share them publicly or commit them to Git.

---

## 3. Connecting to Your Project

### Step 3.1: Install Cloudinary Package

Open your terminal in the project folder and run:

```bash
npm install cloudinary
```

Wait for installation to complete (should take 10-30 seconds).

### Step 3.2: Add Credentials to .env File

1. **Open your `.env` file** (you already have it open!)

2. **Add these three lines** at the end of the file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

3. **Replace the placeholder values** with your actual credentials:

**Example:**
```env
CLOUDINARY_CLOUD_NAME=dxyz1234abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

4. **Save the file** (Ctrl + S)

### Step 3.3: Restart Your Dev Server

If your dev server is running, restart it:

```bash
# Press Ctrl + C to stop the server
# Then run:
npm run dev
```

✅ **Your project is now connected to Cloudinary!**

---

## 4. Uploading Media via Cloudinary Dashboard

You can upload files directly through Cloudinary's web interface.

### Step 4.1: Access Media Library
1. Log in to **https://cloudinary.com/console**
2. Click **"Media Library"** in the left sidebar
3. You'll see your media library (empty at first)

### Step 4.2: Upload Files

**Method A - Drag & Drop:**
1. Open your file explorer
2. Select images/videos you want to upload
3. Drag them into the Cloudinary Media Library window
4. Drop them → Upload starts automatically!

**Method B - Upload Button:**
1. Click the **"Upload"** button (top-right)
2. Click **"Select files"**
3. Browse and select your files
4. Click **"Open"**
5. Files will upload automatically

### Step 4.3: Organize with Folders

**Create a Folder:**
1. Click **"Create Folder"** button
2. Name it (e.g., "gallery", "events", "portraits")
3. Click "Create"

**Upload to a Folder:**
1. Click on the folder name to open it
2. Upload files using drag-drop or upload button
3. Files will be stored in that folder

**Recommended Folder Structure:**
```
photo-studio/
├── gallery/          (Gallery images)
├── events/           (Event photos)
├── portraits/        (Portrait sessions)
├── videos/           (Video content)
└── thumbnails/       (Generated thumbnails)
```

### Step 4.4: Get Image URLs

After uploading:
1. Click on any image/video
2. You'll see a details panel on the right
3. Find the **"URL"** field
4. Click **"Copy URL"** button
5. Use this URL in your website!

**Example URL:**
```
https://res.cloudinary.com/dxyz1234abc/image/upload/v1234567890/photo-studio/gallery/image-1.jpg
```

---

## 5. Uploading Media via Your App

You can upload files programmatically through your application.

### Step 5.1: Create a Test Upload Page

I've already created the files for you! Let's test them:

1. **Start your dev server** (if not running):
```bash
npm run dev
```

2. **Open your browser** and go to:
```
http://localhost:4321/upload-example
```

### Step 5.2: Test File Upload

1. You'll see an upload form with:
   - File input
   - Media type selector (Image/Video)
   - Upload button

2. **To upload an image:**
   - Click "Choose File"
   - Select an image from your computer
   - Make sure "Image" is selected in the dropdown
   - Click "Upload"
   - Wait for upload to complete
   - You'll see the uploaded image and its URL!

3. **To upload a video:**
   - Click "Choose File"
   - Select a video file
   - Select "Video" in the dropdown
   - Click "Upload"
   - Wait (videos take longer)
   - You'll see the uploaded video!

### Step 5.3: Using the Upload API in Your Code

**Example: Upload from a form**

```javascript
// In your JavaScript/TypeScript code
async function uploadFile(file, type = 'image') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  formData.append('folder', 'photo-studio/gallery');

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  
  if (result.success) {
    console.log('Uploaded!', result.url);
    return result.url;
  } else {
    console.error('Upload failed:', result.error);
  }
}

// Usage
const fileInput = document.getElementById('myFileInput');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const url = await uploadFile(file, 'image');
  console.log('Image URL:', url);
});
```

**Example: Upload from server-side**

```typescript
// In an Astro page or API route
import { uploadImage, uploadVideo } from '../lib/cloudinary';

// Upload an image
const result = await uploadImage(
  '/path/to/local/image.jpg',
  'photo-studio/gallery'
);

console.log(result.url); // Cloudinary URL

// Upload a video
const videoResult = await uploadVideo(
  '/path/to/video.mp4',
  'photo-studio/videos'
);

console.log(videoResult.url); // Video URL
```

---

## 6. Managing Your Media

### Step 6.1: View All Media
1. Go to **Media Library** in Cloudinary dashboard
2. You'll see all your uploaded files
3. Use filters to find specific files:
   - Search by name
   - Filter by type (image/video)
   - Filter by folder
   - Sort by date, size, etc.

### Step 6.2: Edit Images Online

Cloudinary has a built-in image editor!

1. Click on any image
2. Click **"Edit"** button
3. You can:
   - Crop and resize
   - Adjust brightness/contrast
   - Apply filters
   - Add text overlays
   - Add watermarks
   - And more!
4. Click **"Save"** when done

### Step 6.3: Transform Images via URL

You can transform images by modifying the URL:

**Original:**
```
https://res.cloudinary.com/demo/image/upload/sample.jpg
```

**Resize to 300x300:**
```
https://res.cloudinary.com/demo/image/upload/w_300,h_300,c_fill/sample.jpg
```

**Add watermark:**
```
https://res.cloudinary.com/demo/image/upload/l_watermark,o_50/sample.jpg
```

**Common Transformations:**

| Transformation | URL Parameter | Example |
|---------------|---------------|---------|
| Width | `w_500` | Resize to 500px wide |
| Height | `h_300` | Resize to 300px tall |
| Crop | `c_fill` | Fill the dimensions |
| Quality | `q_80` | 80% quality |
| Format | `f_webp` | Convert to WebP |
| Blur | `e_blur:300` | Blur effect |
| Grayscale | `e_grayscale` | Black & white |
| Rotate | `a_45` | Rotate 45 degrees |

**Using in your code:**

```typescript
import { getOptimizedImageUrl } from '../lib/cloudinary';

// Get optimized URL
const url = getOptimizedImageUrl('photo-studio/gallery/image-1', {
  width: 800,
  height: 600,
  crop: 'fill',
  quality: 'auto',
  fetch_format: 'auto'
});
```

### Step 6.4: Delete Media

**Via Dashboard:**
1. Go to Media Library
2. Click on the file you want to delete
3. Click the **trash icon** or **"Delete"** button
4. Confirm deletion

**Via Your App:**
```javascript
async function deleteFile(publicId, type = 'image') {
  const response = await fetch('/api/delete-media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      publicId: publicId,
      resourceType: type
    })
  });

  const result = await response.json();
  return result.success;
}

// Usage
await deleteFile('photo-studio/gallery/image-1', 'image');
```

### Step 6.5: Bulk Operations

**Upload Multiple Files:**
1. In Media Library, click "Upload"
2. Select multiple files (Ctrl+Click or Shift+Click)
3. Click "Open" → All files upload at once!

**Delete Multiple Files:**
1. Check the boxes next to files you want to delete
2. Click "Delete" button at the top
3. Confirm deletion

**Move Files:**
1. Select files (checkboxes)
2. Click "Move" button
3. Select destination folder
4. Click "Move"

---

## 7. Advanced Features

### 7.1: Auto-Tagging with AI

Cloudinary can automatically tag your images!

1. Go to **Settings** → **Upload**
2. Enable **"Auto-tagging"**
3. Choose tagging service (Google, AWS, etc.)
4. New uploads will be auto-tagged!

**Example tags:** "person", "outdoor", "wedding", "portrait", etc.

### 7.2: Face Detection

Automatically detect and crop around faces:

```typescript
const url = getOptimizedImageUrl('image-id', {
  width: 300,
  height: 300,
  crop: 'thumb',
  gravity: 'face' // Focus on faces!
});
```

### 7.3: Video Thumbnails

Generate thumbnails from videos:

```typescript
// Get thumbnail from video at 5 seconds
const thumbnail = cloudinary.url('video-id', {
  resource_type: 'video',
  format: 'jpg',
  start_offset: '5' // 5 seconds in
});
```

### 7.4: Responsive Images

Generate multiple sizes for responsive design:

```typescript
import { getResponsiveImageUrls } from '../lib/cloudinary';

const urls = getResponsiveImageUrls('image-id');

// Use in HTML
<picture>
  <source media="(min-width: 1024px)" srcset="${urls.large}">
  <source media="(min-width: 640px)" srcset="${urls.medium}">
  <img src="${urls.small}" alt="Responsive image">
</picture>
```

### 7.5: Upload Presets

Create upload presets for consistent settings:

1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Click **"Add upload preset"**
4. Configure:
   - Name: "gallery_images"
   - Folder: "photo-studio/gallery"
   - Transformations: resize, quality, etc.
   - Tags: auto-add tags
5. Click **"Save"**

Use in code:
```typescript
const result = await uploadImage(file, undefined, {
  upload_preset: 'gallery_images'
});
```

---

## 8. Best Practices

### 8.1: Folder Organization

✅ **Good Structure:**
```
photo-studio/
├── gallery/
│   ├── weddings/
│   ├── portraits/
│   └── events/
├── videos/
│   ├── promotional/
│   └── client-videos/
└── assets/
    ├── logos/
    └── watermarks/
```

❌ **Bad Structure:**
```
all-images-here.jpg
random-video.mp4
photo1.jpg
photo2.jpg
```

### 8.2: Naming Conventions

✅ **Good Names:**
- `wedding-2024-01-15-ceremony.jpg`
- `portrait-john-smith-headshot.jpg`
- `event-birthday-party-group-photo.jpg`

❌ **Bad Names:**
- `IMG_1234.jpg`
- `photo.jpg`
- `untitled.jpg`

### 8.3: Image Optimization

Always use these transformations:
```typescript
{
  quality: 'auto',        // Automatic quality
  fetch_format: 'auto',   // Auto WebP/AVIF
  dpr: 'auto',           // Auto device pixel ratio
  crop: 'limit'          // Don't upscale
}
```

### 8.4: Security

1. ✅ **Never expose API Secret** in client-side code
2. ✅ **Use signed uploads** for production
3. ✅ **Implement authentication** before allowing uploads
4. ✅ **Validate file types** and sizes
5. ✅ **Set upload limits** in Cloudinary settings

### 8.5: Performance

1. ✅ **Use lazy loading** for images
2. ✅ **Generate thumbnails** for galleries
3. ✅ **Use responsive images** for different screen sizes
4. ✅ **Enable caching** with proper headers
5. ✅ **Use CDN URLs** (Cloudinary provides this automatically)

### 8.6: Backup Strategy

1. ✅ **Enable versioning** in Cloudinary (Settings → Upload)
2. ✅ **Keep local backups** of original files
3. ✅ **Export media list** regularly (Media Library → Export)
4. ✅ **Monitor usage** to avoid quota limits

---

## 🎯 Quick Reference Commands

### Install Package
```bash
npm install cloudinary
```

### Start Dev Server
```bash
npm run dev
```

### Test Upload Page
```
http://localhost:4321/upload-example
```

### Environment Variables (.env)
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🆘 Troubleshooting

### Problem: "Invalid API credentials"
**Solution:**
- Double-check your `.env` file
- Make sure there are no extra spaces
- Restart your dev server

### Problem: "Upload failed"
**Solution:**
- Check file size (free plan: max 100MB per file)
- Check file format (supported: JPG, PNG, GIF, MP4, etc.)
- Check your internet connection

### Problem: "Images not displaying"
**Solution:**
- Verify the URL is correct
- Check if the image exists in Media Library
- Try opening the URL directly in browser

### Problem: "Quota exceeded"
**Solution:**
- Check your usage in Dashboard
- Delete unused files
- Upgrade plan if needed
- Optimize images to reduce storage

---

## 📞 Support Resources

- **Cloudinary Documentation:** https://cloudinary.com/documentation
- **Support Center:** https://support.cloudinary.com
- **Community Forum:** https://community.cloudinary.com
- **Status Page:** https://status.cloudinary.com

---

## ✅ Setup Checklist

- [ ] Created Cloudinary account
- [ ] Copied Cloud Name, API Key, and API Secret
- [ ] Installed `cloudinary` package (`npm install cloudinary`)
- [ ] Added credentials to `.env` file
- [ ] Restarted dev server
- [ ] Tested upload at `/upload-example`
- [ ] Created folder structure in Media Library
- [ ] Uploaded test images/videos
- [ ] Verified images display correctly

---

**🎉 Congratulations!** You're now ready to use Cloudinary with your photo studio project!

For specific integration questions or custom features, just ask! 😊
