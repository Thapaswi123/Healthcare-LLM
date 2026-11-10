# AWS EC2 Deployment Guide for 3.227.251.11

## Prerequisites Checklist
- [ ] AWS EC2 instance running at 3.227.251.11
- [ ] SSH access to the EC2 instance
- [ ] Security Group configured for ports 3000, 3001, 3002, 3004
- [ ] Node.js installed on EC2 (v18 or higher)

---

## Step 1: Configure AWS Security Group

### 1.1 Open AWS Console
- Go to: https://console.aws.amazon.com/ec2/
- Navigate to: **Security Groups**

### 1.2 Add Inbound Rules
Add these rules to your EC2 instance's security group:

| Type | Protocol | Port Range | Source | Description |
|------|----------|------------|--------|-------------|
| Custom TCP | TCP | 3000 | 0.0.0.0/0 | Prior Authorization |
| Custom TCP | TCP | 3001 | 0.0.0.0/0 | Medication Safety |
| Custom TCP | TCP | 3002 | 0.0.0.0/0 | Patient Communication |
| Custom TCP | TCP | 3004 | 0.0.0.0/0 | AI Clinical Co-Pilot |
| SSH | TCP | 22 | Your IP | SSH Access |

---

## Step 2: Connect to EC2 Instance

### Option A: Using SSH (Windows)
```bash
ssh -i "your-key.pem" ubuntu@3.227.251.11
```

### Option B: Using AWS Console
- Go to EC2 Dashboard
- Select your instance
- Click "Connect" → "Session Manager"

---

## Step 3: Install Node.js on EC2

```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

---

## Step 4: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Verify installation
pm2 --version
```

---

## Step 5: Upload Your Code to EC2

### Option A: Using Git (Recommended)
```bash
# On EC2 instance
cd /home/ec2-user
git clone https://github.com/sthagasavi/healthcare-llm-applications.git
cd healthcare-llm-applications
```

### Option B: Using SCP (From Your Local Machine)
```bash
# From your local machine (Windows)
scp -i "your-key.pem" -r "D:\HealthCare LLM" ubuntu@3.227.251.11:/home/ubuntu/
```

---

## Step 6: Install Dependencies

```bash
# Navigate to project directory
cd /home/ec2-user/healthcare-llm-applications

# Install dependencies for each app
cd "AI Clinical Co-Pilot"
npm install
cd ..

cd "Prior Authorization Automation/ai_pa_full_modules/frontend"
npm install
cd ../../..

cd "Medication Safety Assistant/med_safety_app"
npm install
cd ../..

cd "Patient Communication Agent/patient_comm_app"
npm install
cd ../..
```

---

## Step 7: Build Production Apps

```bash
# Build AI Clinical Co-Pilot
cd "AI Clinical Co-Pilot"
npm run build
cd ..

# Build Prior Authorization
cd "Prior Authorization Automation/ai_pa_full_modules/frontend"
npm run build
cd ../../..

# Build Medication Safety
cd "Medication Safety Assistant/med_safety_app"
npm run build
cd ../..

# Build Patient Communication
cd "Patient Communication Agent/patient_comm_app"
npm run build
cd ../..
```

---

## Step 8: Create PM2 Ecosystem File

Create a file: `ecosystem.config.js`

```bash
nano ecosystem.config.js
```

Paste this content:

```javascript
module.exports = {
  apps: [
    {
      name: 'ai-clinical-copilot',
      cwd: '/home/ec2-user/healthcare-llm-applications/AI Clinical Co-Pilot',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3004,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'prior-authorization',
      cwd: '/home/ec2-user/healthcare-llm-applications/Prior Authorization Automation/ai_pa_full_modules/frontend',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'medication-safety',
      cwd: '/home/ec2-user/healthcare-llm-applications/Medication Safety Assistant/med_safety_app',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3001,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'patient-communication',
      cwd: '/home/ec2-user/healthcare-llm-applications/Patient Communication Agent/patient_comm_app',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3002,
        NODE_ENV: 'production'
      }
    }
  ]
}
```

Save and exit (Ctrl+X, Y, Enter)

---

## Step 9: Start All Applications with PM2

```bash
# Start all apps
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the command it gives you
```

---

## Step 10: Verify Deployment

Test each URL in your browser:

- ✅ http://3.227.251.11:3004 (AI Clinical Co-Pilot)
- ✅ http://3.227.251.11:3000 (Prior Authorization)
- ✅ http://3.227.251.11:3001 (Medication Safety)
- ✅ http://3.227.251.11:3002 (Patient Communication)

---

## Step 11: Useful PM2 Commands

```bash
# View all apps
pm2 list

# Restart an app
pm2 restart ai-clinical-copilot

# Stop an app
pm2 stop ai-clinical-copilot

# View logs
pm2 logs ai-clinical-copilot

# Monitor resources
pm2 monit

# Restart all apps
pm2 restart all

# Stop all apps
pm2 stop all
```

---

## Troubleshooting

### Issue: Port already in use
```bash
# Find process using port
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>
```

### Issue: Permission denied
```bash
# Fix permissions
sudo chown -R ec2-user:ec2-user /home/ec2-user/healthcare-llm-applications
```

### Issue: Apps not accessible
```bash
# Check if apps are running
pm2 status

# Check firewall
sudo iptables -L

# Check security group in AWS Console
```

### Issue: Out of memory
```bash
# Check memory
free -h

# Increase swap space
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## Next Steps

1. **Set up a domain name** (optional)
   - Buy a domain from Route53 or other provider
   - Point it to 3.227.251.11
   - Access via: https://yourdomain.com:3004

2. **Set up NGINX reverse proxy** (optional)
   - Remove port numbers from URLs
   - Enable HTTPS with SSL certificate

3. **Set up monitoring**
   - Use CloudWatch for logs
   - Set up alerts for downtime

---

## Quick Reference

**Start all apps:**
```bash
pm2 start ecosystem.config.js
```

**Stop all apps:**
```bash
pm2 stop all
```

**View logs:**
```bash
pm2 logs
```

**Restart after code changes:**
```bash
pm2 restart all
```

---

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs`
2. Check security group settings in AWS
3. Verify Node.js version: `node --version`
4. Check if ports are open: `sudo netstat -tulpn | grep LISTEN`
