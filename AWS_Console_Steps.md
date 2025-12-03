# AWS Console Upload - Simple Step-by-Step Guide

## 🎯 Your Mission
Upload your Healthcare LLM portfolio to AWS S3 using only your web browser.

---

## 📝 Before You Start

**What you need:**
- ✅ Web browser (Chrome, Firefox, or Edge)
- ✅ Internet connection
- ✅ Your healthcare LLM files (already on your computer)
- ✅ AWS account (or 10 minutes to create one)

**What you DON'T need:**
- ❌ AWS CLI
- ❌ Programming knowledge
- ❌ Command line access
- ❌ Company AWS account

---

## 🚀 Quick Start (5 Steps)

### Step 1: Go to AWS
```
1. Open browser
2. Go to: https://console.aws.amazon.com
3. Sign in (or create account if needed)
```

### Step 2: Open S3
```
1. In the search bar at top, type: S3
2. Click on "S3" in the results
3. You'll see the S3 dashboard
```

### Step 3: Create Bucket
```
1. Click orange "Create bucket" button
2. Enter bucket name: healthcare-llm-portfolio-yourname
3. Choose region: US East (N. Virginia)
4. Uncheck "Block all public access" (if you want public portfolio)
5. Check the warning acknowledgment box
6. Scroll down and click "Create bucket"
```

### Step 4: Upload Files
```
1. Click on your new bucket name
2. Click "Upload" button
3. Click "Add files" or "Add folder"
4. Select your files/folders
5. Click "Upload" at bottom
6. Wait for green success message
```

### Step 5: Get Your URLs
```
1. Click on any uploaded file
2. Copy the "Object URL" 
3. Share this URL with your mentor
```

---

## 🖼️ Visual Guide

### Creating a Bucket

**Screen 1: S3 Dashboard**
```
┌─────────────────────────────────────────┐
│ Amazon S3                               │
│ ┌─────────────────────────────────────┐ │
│ │  [Create bucket]  [Upload]          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Buckets (0)                            │
│ No buckets yet                         │
└─────────────────────────────────────────┘
```

**Screen 2: Create Bucket Form**
```
┌─────────────────────────────────────────┐
│ Create bucket                           │
│                                         │
│ Bucket name *                          │
│ [healthcare-llm-portfolio-yourname]    │
│                                         │
│ AWS Region *                           │
│ [US East (N. Virginia) us-east-1]     │
│                                         │
│ Block Public Access settings           │
│ ☐ Block all public access             │
│                                         │
│ [Cancel]              [Create bucket]  │
└─────────────────────────────────────────┘
```

### Uploading Files

**Screen 3: Upload Interface**
```
┌─────────────────────────────────────────┐
│ Upload                                  │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │  Drag and drop files here           │ │
│ │  or                                 │ │
│ │  [Add files]  [Add folder]          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Files and folders (0)                  │
│                                         │
│ [Cancel]                    [Upload]   │
└─────────────────────────────────────────┘
```

**Screen 4: Upload Progress**
```
┌─────────────────────────────────────────┐
│ Upload: In progress                     │
│                              