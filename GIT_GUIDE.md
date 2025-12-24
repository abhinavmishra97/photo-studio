# Git Best Practices for Ram Digital Photo Studio

## 🚨 CRITICAL - NEVER COMMIT THESE FILES!

### **1. Environment Variables (.env)**
**Contains:**
- Supabase URL
- Supabase Anon Key
- **Supabase Service Role Key** ⚠️ EXTREMELY SENSITIVE!

**Why dangerous:**
- Anyone with service role key can DELETE your entire database
- Can read all customer data
- Can modify/steal enquiries
- **NEVER share this key publicly!**

**Already protected by:** `.gitignore` ✅

---

## ✅ Files You SHOULD Commit

### **Source Code:**
- ✅ `src/` folder (all your code)
- ✅ `public/` folder (images, fonts, etc.)
- ✅ `package.json` (dependencies list)
- ✅ `astro.config.mjs` (Astro configuration)
- ✅ `tailwind.config.mjs` (Tailwind configuration)
- ✅ `tsconfig.json` (TypeScript configuration)

### **Documentation:**
- ✅ `README.md` (project description)
- ✅ `.env.example` (template for environment variables)
- ✅ `supabase-setup.sql` (database schema - no secrets here)
- ⚠️ `SUPABASE_SETUP_GUIDE.md` (check for API keys first!)
- ⚠️ `QUICK_REFERENCE.md` (check for sensitive URLs first!)

### **Configuration:**
- ✅ `.gitignore` (tells Git what to ignore)
- ✅ `.prettierrc` or `.eslintrc` (code formatting)

---

## 🚫 Files You Should NEVER Commit

### **1. Secrets & Credentials:**
- ❌ `.env` (environment variables)
- ❌ `.env.local`
- ❌ `.env.production`
- ❌ Any file with API keys, passwords, tokens

### **2. Build Artifacts:**
- ❌ `dist/` (built website)
- ❌ `.astro/` (generated types)
- ❌ `.vercel/` or `.netlify/` (deployment cache)

### **3. Dependencies:**
- ❌ `node_modules/` (can be reinstalled with `npm install`)
- ⚠️ `package-lock.json` (optional - some teams commit, some don't)

### **4. OS/Editor Files:**
- ❌ `.DS_Store` (Mac)
- ❌ `Thumbs.db` (Windows)
- ❌ `.vscode/` (VS Code settings - unless team uses same settings)
- ❌ `.idea/` (JetBrains IDEs)

### **5. Logs & Temporary Files:**
- ❌ `*.log` (error logs)
- ❌ `*.tmp` (temporary files)
- ❌ `.cache/` (cache folders)

---

## 📋 Step-by-Step: Push to GitHub

### **Step 1: Initialize Git (if not done)**
```bash
cd "C:\Users\Abhinav Mishra\OneDrive\Desktop\photo-studio\photo-studio"
git init
```

### **Step 2: Check What Will Be Committed**
```bash
git status
```

**Look for:**
- ✅ Green files = will be committed (good!)
- ❌ Red files = not tracked yet
- ⚠️ Check if `.env` appears - if yes, STOP and fix `.gitignore`!

### **Step 3: Verify .env is Ignored**
```bash
git check-ignore .env
```
**Should output:** `.env` (means it's ignored ✅)

**If it doesn't output anything:**
```bash
# Remove .env from Git if accidentally added
git rm --cached .env
```

### **Step 4: Add Files to Git**
```bash
# Add all files (respects .gitignore)
git add .

# Or add specific files
git add src/
git add package.json
git add README.md
```

### **Step 5: Create First Commit**
```bash
git commit -m "Initial commit: Ram Digital Photo Studio website with Supabase backend"
```

### **Step 6: Create GitHub Repository**
1. Go to **github.com**
2. Click **"New repository"**
3. Name: `ram-digital-photo-studio`
4. **IMPORTANT:** Set to **Private** (not Public!)
5. Don't initialize with README (you already have one)
6. Click **"Create repository"**

### **Step 7: Link Local to GitHub**
```bash
# Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/ram-digital-photo-studio.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## 🔒 Security Checklist Before Pushing

### **Run these checks:**

```bash
# 1. Check if .env is ignored
git check-ignore .env
# Should output: .env

# 2. Check what will be committed
git status
# Should NOT show .env

# 3. Search for API keys in tracked files
git grep -i "supabase_service_role_key"
# Should return nothing or only .env.example

# 4. Check for hardcoded secrets
git grep -i "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
# Should return nothing (this is JWT token pattern)
```

### **If you find secrets in code:**
```bash
# Remove the file from Git
git rm --cached path/to/file

# Fix the file (remove secrets)
# Then add it back
git add path/to/file
```

---

## 📝 Good Commit Message Practices

### **Format:**
```
<type>: <short description>

<optional longer description>
```

### **Examples:**
```bash
# Feature
git commit -m "feat: add admin dashboard for enquiries"

# Bug fix
git commit -m "fix: resolve email sending issue in contact form"

# Update
git commit -m "update: improve mobile responsiveness of admin page"

# Documentation
git commit -m "docs: add setup instructions for Supabase"

# Style
git commit -m "style: update color scheme for status badges"
```

---

## 🔄 Daily Git Workflow

### **Before starting work:**
```bash
git pull origin main
```

### **After making changes:**
```bash
# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "feat: add SMS reply option to admin dashboard"

# 4. Push to GitHub
git push origin main
```

---

## 🆘 Common Issues & Fixes

### **Issue 1: Accidentally committed .env**
```bash
# Remove from Git but keep local file
git rm --cached .env

# Commit the removal
git commit -m "fix: remove .env from version control"

# Push
git push origin main
```

### **Issue 2: Want to undo last commit**
```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit and discard changes (CAREFUL!)
git reset --hard HEAD~1
```

### **Issue 3: .gitignore not working**
```bash
# Clear Git cache
git rm -r --cached .
git add .
git commit -m "fix: update .gitignore"
```

---

## 🎯 Quick Reference

### **Safe to commit:**
✅ Source code (`.astro`, `.ts`, `.js`, `.css`)  
✅ Configuration files (`package.json`, `astro.config.mjs`)  
✅ Documentation (`.md` files without secrets)  
✅ Public assets (images, fonts)  
✅ `.env.example` (template only, no real values)  

### **NEVER commit:**
❌ `.env` (real environment variables)  
❌ `node_modules/` (dependencies)  
❌ `dist/` (build output)  
❌ API keys, passwords, tokens  
❌ Database credentials  
❌ Service role keys  

---

## 📞 Need Help?

**Before pushing, ask yourself:**
1. Is `.env` in the commit? → **STOP!**
2. Are there any API keys in code? → **REMOVE THEM!**
3. Is the repository set to Private? → **YES!**
4. Did I check `git status`? → **DO IT!**

**Remember:** Once pushed to GitHub, it's very hard to completely remove secrets!

---

## 🚀 You're Ready!

Your `.gitignore` is now properly configured. Follow the steps above to safely push your code to GitHub!
