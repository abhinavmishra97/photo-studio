# Cloudinary Setup Guide for Photo Studio

This guide explains how to use Cloudinary for managing images and videos in your photo studio application.

## 🚀 Quick Start

### 1. Installation

```bash
npm install cloudinary
```

### 2. Environment Variables

Add these to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Get these credentials from your [Cloudinary Dashboard](https://cloudinary.com/console).

## 📁 Project Structure

```
src/
├── lib/
│   └── cloudinary.ts          # Cloudinary configuration and utilities
├── pages/
│   └── api/
│       ├── upload.ts          # Upload endpoint
│       └── delete-media.ts    # Delete endpoint
└── components/
    └── CloudinaryUpload.astro # Sample upload component
```

## 🔧 Usage Examples

### Upload an Image

```typescript
import { uploadImage } from '../lib/cloudinary';

const result = await uploadImage(
  'path/to/image.jpg',  // or base64 string
  'photo-studio/gallery',  // folder name
  {
    transformation: [
      { width: 1920, height: 1080, crop: 'limit' }
    ]
  }
);

if (result.success) {
  console.log('Image URL:', result.url);
  console.log('Public ID:', result.publicId);
}
```

### Upload a Video

```typescript
import { uploadVideo } from '../lib/cloudinary';

const result = await uploadVideo(
  'path/to/video.mp4',
  'photo-studio/videos'
);

if (result.success) {
  console.log('Video URL:', result.url);
  console.log('Duration:', result.duration);
}
```

### Delete a Resource

```typescript
import { deleteResource } from '../lib/cloudinary';

const result = await deleteResource(
  'photo-studio/gallery/image123',  // public ID
  'image'  // or 'video'
);

console.log('Deleted:', result.success);
```

### Get Optimized Image URL

```typescript
import { getOptimizedImageUrl } from '../lib/cloudinary';

const url = getOptimizedImageUrl('photo-studio/gallery/image123', {
  width: 800,
  height: 600,
  crop: 'fill',
  gravity: 'auto',
  quality: 'auto:best'
});
```

### Get Responsive Image URLs

```typescript
import { getResponsiveImageUrls } from '../lib/cloudinary';

const urls = getResponsiveImageUrls('photo-studio/gallery/image123');

// Use in HTML
<picture>
  <source media="(min-width: 1024px)" srcset="${urls.large}">
  <source media="(min-width: 640px)" srcset="${urls.medium}">
  <img src="${urls.small}" alt="Gallery image">
</picture>
```

## 🌐 API Endpoints

### POST /api/upload

Upload an image or video to Cloudinary.

**Request:**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('type', 'image'); // or 'video'
formData.append('folder', 'photo-studio/gallery');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

**Response:**
```json
{
  "success": true,
  "url": "https://res.cloudinary.com/...",
  "publicId": "photo-studio/gallery/abc123",
  "width": 1920,
  "height": 1080,
  "format": "jpg"
}
```

### POST /api/delete-media

Delete a resource from Cloudinary.

**Request:**
```javascript
const response = await fetch('/api/delete-media', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    publicId: 'photo-studio/gallery/abc123',
    resourceType: 'image' // or 'video'
  })
});

const result = await response.json();
```

**Response:**
```json
{
  "success": true,
  "result": "ok"
}
```

## 🎨 Using the Upload Component

To test the upload functionality, add the component to any page:

```astro
---
import CloudinaryUpload from '../components/CloudinaryUpload.astro';
---

<CloudinaryUpload />
```

## 🔐 Security Best Practices

1. **Never expose API credentials** - Keep them in `.env` and never commit to Git
2. **Use signed uploads** for production - Add upload presets in Cloudinary dashboard
3. **Implement authentication** - Protect upload/delete endpoints with user authentication
4. **Validate file types** - Only allow specific image/video formats
5. **Set upload limits** - Configure max file size and dimensions

## 📊 Cloudinary Features

### Image Transformations

```typescript
const url = getOptimizedImageUrl('image-id', {
  width: 800,
  height: 600,
  crop: 'fill',           // fill, fit, scale, crop, etc.
  gravity: 'auto',        // auto-detect focus point
  quality: 'auto:best',   // automatic quality optimization
  fetch_format: 'auto',   // auto-select best format (WebP, AVIF)
  effect: 'sharpen:100',  // apply effects
  overlay: 'watermark'    // add watermarks
});
```

### Video Transformations

```typescript
const videoUrl = cloudinary.url('video-id', {
  resource_type: 'video',
  width: 1280,
  height: 720,
  crop: 'fill',
  quality: 'auto',
  format: 'mp4',
  start_offset: '0',      // trim from start
  end_offset: '30',       // trim to 30 seconds
  effect: 'fade:1000'     // fade in effect
});
```

## 🎯 Common Use Cases

### Gallery Images
- Upload high-resolution photos
- Generate thumbnails automatically
- Lazy load with progressive JPEGs
- Apply watermarks for protection

### Video Content
- Upload promotional videos
- Generate video thumbnails
- Adaptive bitrate streaming
- Video transcoding to multiple formats

### User Uploads
- Profile pictures with face detection
- Event photos with auto-tagging
- Bulk uploads with progress tracking

## 📚 Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Node.js SDK Reference](https://cloudinary.com/documentation/node_integration)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Video Transformations](https://cloudinary.com/documentation/video_manipulation_and_delivery)

## 🆘 Troubleshooting

### Upload fails with 401 error
- Check your API credentials in `.env`
- Ensure environment variables are loaded correctly

### Images not displaying
- Verify the public ID is correct
- Check if the resource exists in Cloudinary dashboard
- Ensure the URL is properly formatted

### Slow uploads
- Consider using upload presets
- Implement client-side image compression
- Use chunked uploads for large files

## 💡 Tips

1. Use **folders** to organize your media (e.g., `photo-studio/gallery`, `photo-studio/events`)
2. Enable **auto-tagging** in Cloudinary for better searchability
3. Use **responsive images** to improve page load times
4. Set up **backup and version control** in Cloudinary settings
5. Monitor your **usage quota** to avoid unexpected charges
