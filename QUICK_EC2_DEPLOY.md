# 🚀 Quick EC2 Deployment Guide

## Prerequisites

Before you start, make sure you have:
1. ✅ AWS EC2 instance running at **3.227.251.11**
2. ✅ SSH key file (`.pem` file) to access the instance
3. ✅ Security Group configured (see below)

---

## Step 1: Configure Security Group (AWS Console)

1. Go to: https://console.aws.amazon.com/ec2/
2. Click **Security Groups** in the left menu
3. Select your instance's security group
4. Click **Edit inbound rules**
5. Add these rules:

```
Type: Custom TCP, Port: 3000, Source: 0.0.0.0/0, Description: Prior Auth
Type: Custom TCP, Port: 3001, Source: 0.0.0.0/0, Description: Med Safety
Type: Custom TCP, Port: 3002, Source: 0.0.0.0/0, Description: Patient Comm
Type: Custom TCP, Port: 3004, Source: 0.0.0.0/0, Description: AI Co-Pilot
Type: SSH,        Port: 22,   Source: Your IP,   Description: SSH Access
```

6. Click **Save rules**

---

## Step 2: Connect to EC2

### Windows (PowerShell or CMD):
```bash
ssh -i "path\to\your-key.pem" ubuntu@3.227.251.11
```

### If you get permission error on Windows:
```bash
icacls "path\to\your-key.pem" /inheritance:r
icacls "path\to\your-key.pem" /grant:r "%username%:R"
```

---

## Step 3: Upload Your Code

### Option A: Using Git (Recommended)
```bash
# On EC2 instance
cd /home/ec2-user
git clone https://github.com/sthagasavi/healthcare-llm-applications.git
cd healthcare-llm-applications
```

### Option B: Using SCP from Windows
```bash
# From your local machine
scp -i "your-key.pem" -r "D:\HealthCare LLM" ubuntu@3.227.251.11:/home/ubuntu/healthcare-llm-applications
```

---

## Step 4: Run Deployment Script

```bash
# On EC2 instance
cd /home/ec2-user/healthcare-llm-applications
chmod +x deploy-to-ec2.sh
./deploy-to-ec2.sh
```

This script will:
- ✅ Install Node.js
- ✅ Install PM2
- ✅ Install all dependencies
- ✅ Build all applications
- ✅ Start all applications
- ✅ Configure auto-restart on reboot

---

## Step 5: Verify Deployment

Open these URLs in your browser:

- 🏥 **AI Clinical Co-Pilot**: http://3.227.251.11:3004
- 📋 **Prior Authorization**: http://3.227.251.11:3000
- 💊 **Medication Safety**: http://3.227.251.11:3001
- 💬 **Patient Communication**: http://3.227.251.11:3002

---

## Common Issues & Solutions

### Issue 1: "Connection refused"
**Solution:** Check security group rules in AWS Console

### Issue 2: "Permission denied" when SSH
**Solution:** 
```bash
chmod 400 your-key.pem
```

### Issue 3: Apps not starting
**Solution:**
```bash
pm2 logs
# Check the error messages
```

### Issue 4: Port already in use
**Solution:**
```bash
pm2 stop all
pm2 delete all
pm2 start ecosystem.config.js
```

---

## Useful Commands

```bash
# View app status
pm2 status

# View logs
pm2 logs

# Restart all apps
pm2 restart all

# Stop all apps
pm2 stop all

# Monitor resources
pm2 monit
```

---

## Manual Deployment (If Script Fails)

If the automated script doesn't work, follow the detailed steps in:
📄 **AWS_EC2_DEPLOYMENT_STEPS.md**

---

## Need Help?

1. Check PM2 logs: `pm2 logs`
2. Check if Node.js is installed: `node --version`
3. Check if ports are open: `sudo netstat -tulpn | grep LISTEN`
4. Verify security group in AWS Console

---

## After Deployment

Your apps are now live! Share these URLs:
- http://3.227.251.11:3004 (Main entry point)

The Prior Authorization button will automatically connect to:
- http://3.227.251.11:3000
