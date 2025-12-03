# Manual Deployment Guide - Prior Authorization Apps

## Current Status
✅ **App 1 (full_ai_pa_app)** is already running on **http://localhost:3000**

## Deploy the Remaining 3 Apps

### Step 1: Install Dependencies

Open **Command Prompt** or **PowerShell** and run these commands:

```cmd
:: Install ai_pa_full_modules
cd "D:\HealthCare LLM\Prior Authorization Automation\ai_pa_full_modules\frontend"
npm install
cd "D:\HealthCare LLM"

:: Install ai_pa_next_level
cd "D:\HealthCare LLM\Prior Authorization Automation\ai_pa_next_level\frontend"
npm install
cd "D:\HealthCare LLM"

:: Install ai_pa_full
cd "D:\HealthCare LLM\Prior Authorization Automation\ai_pa_full\frontend"
npm install
cd "D:\HealthCare LLM"
```

### Step 2: Run Each App (Open 3 Separate Terminals)

#### Terminal 1 - ai_pa_full_modules (Port 3001)
```cmd
cd "D:\HealthCare LLM\Prior Authorization Automation\ai_pa_full_modules\frontend"
npm run dev -- -p 3001
```
**URL:** http://localhost:3001

#### Terminal 2 - ai_pa_next_level (Port 3002)
```cmd
cd "D:\HealthCare LLM\Prior Authorization Automation\ai_pa_next_level\frontend"
npm run dev -- -p 3002
```
**URL:** http://localhost:3002

#### Terminal 3 - ai_pa_full (Port 3003)
```cmd
cd "D:\HealthCare LLM\Prior Authorization Automation\ai_pa_full\frontend"
npm run dev -- -p 3003
```
**URL:** http://localhost:3003

---

## OR Use the Batch Files (Easier!)

I've created batch files for you. Just double-click these files:

### Step 1: Install All Dependencies
📁 Double-click: **`install_pa_apps.bat`**

Wait for it to finish installing all dependencies.

### Step 2: Run Each App
📁 Double-click each of these files (they will open in separate windows):
- **`run_pa_app_3001.bat`** - Runs ai_pa_full_modules on port 3001
- **`run_pa_app_3002.bat`** - Runs ai_pa_next_level on port 3002
- **`run_pa_app_3003.bat`** - Runs ai_pa_full on port 3003

---

## All Apps Running

Once all apps are running, you'll have:

| App | Port | URL | Features |
|-----|------|-----|----------|
| full_ai_pa_app | 3000 | http://localhost:3000 | Basic app |
| ai_pa_full_modules | 3001 | http://localhost:3001 | Dashboard, Claims, EHR Sim, Login, Auth |
| ai_pa_next_level | 3002 | http://localhost:3002 | Advanced with RBAC, Audit, Workflows |
| ai_pa_full | 3003 | http://localhost:3003 | Full version |

---

## Troubleshooting

### If npm install fails:
```cmd
npm cache clean --force
npm install
```

### If port is already in use:
Change the port number:
```cmd
npm run dev -- -p 3004
```

### To stop an app:
Press `Ctrl + C` in the terminal window

---

## What Each App Contains

### ai_pa_full_modules (Port 3001)
- `/dashboard` - Main dashboard
- `/claims` - Claims management
- `/ehr-sim` - EHR simulator
- `/login` - User authentication
- `/prior-auth` - Prior authorization workflow

### ai_pa_next_level (Port 3002)
- `/audit` - Audit logs
- `/claims` - Advanced claims management
- `/prior-auth` - Enhanced prior auth with AI
- RBAC system
- React Query integration

### ai_pa_full (Port 3003)
- Basic prior authorization interface
- Minimal features

---

## Next Steps After Deployment

1. Test each application in your browser
2. Take screenshots of each app
3. Document any issues
4. Prepare for S3 upload
