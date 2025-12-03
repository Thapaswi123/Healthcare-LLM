# Prior Authorization Automation - Deployment Status

## ✅ Deployed Applications

### 1. full_ai_pa_app
**Status:** ✅ RUNNING  
**Frontend URL:** http://localhost:3000  
**Description:** Basic AI Prior Authorization app  
**Tech Stack:** Next.js 14, React, TypeScript, Material-UI, Axios  

**Features:**
- Simple UI with "AI PA App" display
- Backend: AWS Lambda functions (serverless)
  - `/prior-auth` endpoint (POST)
  - `/ehr` endpoint (GET)

---

## 📦 Available Applications (Not Yet Deployed)

### 2. ai_pa_full_modules
**Status:** ⏳ READY TO DEPLOY  
**Description:** Full modular version with complete features  
**Tech Stack:** Next.js 14, React, TypeScript, Material-UI, JWT Auth

**Features:**
- 📊 Dashboard page
- 📝 Claims management
- 🏥 EHR Simulator
- 🔐 Login/Authentication
- 📋 Prior Authorization workflow

**Pages:**
- `/dashboard` - Main dashboard
- `/claims` - Claims management
- `/ehr-sim` - EHR simulator
- `/login` - User authentication
- `/prior-auth` - Prior authorization requests

**Backend:**
- AWS Lambda functions
- Serverless Framework

---

### 3. ai_pa_next_level
**Status:** ⏳ READY TO DEPLOY  
**Description:** Advanced version with enterprise features  
**Tech Stack:** Next.js, React, TypeScript, DynamoDB, OpenAI, S3, React Query

**Advanced Features:**
- 🤖 OpenAI integration
- 💾 DynamoDB database
- 📁 S3 file storage
- 🔐 RBAC (Role-Based Access Control)
- 🔄 React Query for data management
- 📊 Advanced workflows

**Backend:**
- AWS Lambda functions
- DynamoDB tables
- S3 buckets
- OpenAI API integration

---

### 4. ai_pa_full
**Status:** ⏳ READY TO DEPLOY  
**Description:** Basic full-stack version  
**Tech Stack:** Next.js, React, Serverless

**Features:**
- Basic prior authorization workflow
- Serverless backend

---

## 🚀 Deployment Instructions

### To Deploy Remaining Apps:

#### Option 1: Deploy Locally (Development)
Each app needs:
```bash
# Navigate to frontend folder
cd "Prior Authorization Automation\[app-name]\frontend"

# Install dependencies
npm install

# Run development server
npm run dev
```

**Note:** Each app will need a different port:
- full_ai_pa_app: Port 3000 (currently running)
- ai_pa_full_modules: Port 3001
- ai_pa_next_level: Port 3002
- ai_pa_full: Port 3003

To run on different ports:
```bash
npm run dev -- -p 3001
```

#### Option 2: Deploy to AWS (Production)
Backend deployment requires:
1. AWS account configured
2. Serverless Framework installed: `npm install -g serverless`
3. AWS credentials set up
4. Deploy backend:
   ```bash
   cd backend
   serverless deploy
   ```
5. Update frontend with backend API URLs
6. Deploy frontend to S3 + CloudFront or Vercel

---

## 📊 Comparison Matrix

| Feature | full_ai_pa_app | ai_pa_full | ai_pa_full_modules | ai_pa_next_level |
|---------|----------------|------------|-------------------|------------------|
| Dashboard | ❌ | ❌ | ✅ | ✅ |
| Claims Management | ❌ | ❌ | ✅ | ✅ |
| EHR Simulator | ❌ | ❌ | ✅ | ✅ |
| Authentication | ❌ | ❌ | ✅ (JWT) | ✅ (RBAC) |
| Database | ❌ | ❌ | ❌ | ✅ (DynamoDB) |
| AI Integration | ❌ | ❌ | ❌ | ✅ (OpenAI) |
| File Storage | ❌ | ❌ | ❌ | ✅ (S3) |
| Workflows | ❌ | ❌ | ❌ | ✅ |
| React Query | ❌ | ❌ | ❌ | ✅ |

---

## 🎯 Recommended Deployment Order

1. ✅ **full_ai_pa_app** - Already running (basic version)
2. 🔄 **ai_pa_full_modules** - Deploy next (full features, no cloud dependencies)
3. 🔄 **ai_pa_next_level** - Deploy last (requires AWS setup)
4. 🔄 **ai_pa_full** - Optional (similar to #1)

---

## 💡 Next Steps

### For Local Development:
1. Deploy ai_pa_full_modules on port 3001
2. Deploy ai_pa_next_level on port 3002 (may need mock data for AWS services)
3. Test all applications

### For AWS/S3 Upload:
1. Build all frontends: `npm run build`
2. Upload built files to S3
3. Deploy backends using Serverless Framework
4. Configure API endpoints in frontends
5. Enable S3 static website hosting

---

## 📝 Notes

- All apps use Next.js 14 with App Router
- Backend uses AWS Lambda + API Gateway
- Material-UI for consistent styling
- TypeScript for type safety
- Serverless Framework for infrastructure as code
