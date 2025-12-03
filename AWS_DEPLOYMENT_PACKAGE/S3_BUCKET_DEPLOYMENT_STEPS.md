# AWS S3 Bucket Deployment - Step by Step

## ⚠️ Important Understanding

According to your deployment guide:
- **S3 = Static files only** (HTML, CSS, JS, images, JSON)
- **EC2 = Backend/executables** (Node.js, Python, Java, .exe, .jar)

Your Next.js apps have **API routes** that need Node.js execution, so we need **BOTH S3 + EC2**.

---

## Architecture (Per Your Doc)

```
User Browser → S3 (Static Frontend) → EC2 (Backend APIs) → Database (optional)
```

---

## PART 1: S3 DEPLOYMENT (Frontend Static Files)

### Step 1: Install AWS CLI

**Windows:**
```powershell
# Download from: https://awscli.amazonaws.com/AWSCLIV2.msi
# Or use:
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

**Verify installation:**
```bash
aws --version
```

### Step 2: Configure AWS CLI

```bash
aws configure
```

Enter:
- **AWS Access Key ID:** [Your access key]
- **AWS Secret Access Key:** [Your secret key]
- **Default region:** us-east-1
- **Default output format:** json

### Step 3: Create S3 Buckets

```bash
# Create buckets for each application
aws s3 mb s3://healthcare-clinical-copilot --region us-east-1
aws s3 mb s3://healthcare-prior-auth --region us-east-1
aws s3 mb s3://healthcare-medication-safety --region us-east-1
aws s3 mb s3://healthcare-patient-communication --region us-east-1
```

**Note:** Bucket names must be globally unique. If these are taken, use:
- `healthcare-clinical-copilot-yourname`
- `healthcare-prior-auth-yourname`
- etc.

### Step 4: Build Static Exports

**For each Next.js app, add to package.json:**

```json
{
  "scripts": {
    "build": "next build",
    "export": "next export"
  }
}
```

**Build AI Clinical Co-Pilot:**
```bash
cd "AI Clinical Co-Pilot"
npm install
npm run build
npm run export
```

**Build Prior Authorization:**
```bash
cd "Prior Authorization Automation/ai_pa_full_modules/frontend"
npm install
npm run build
npm run export
```

**Build Medication Safety:**
```bash
cd "Medication Safety Assistant/med_safety_app"
npm install
npm run build
npm run export
```

**Build Patient Communication:**
```bash
cd "Patient Communication Agent/patient_comm_app"
npm install
npm run build
npm run export
```

### Step 5: Upload to S3

```bash
# Upload AI Clinical Co-Pilot
cd "AI Clinical Co-Pilot/out"
aws s3 sync . s3://healthcare-clinical-copilot --delete

# Upload Prior Authorization
cd "Prior Authorization Automation/ai_pa_full_modules/frontend/out"
aws s3 sync . s3://healthcare-prior-auth --delete

# Upload Medication Safety
cd "Medication Safety Assistant/med_safety_app/out"
aws s3 sync . s3://healthcare-medication-safety --delete

# Upload Patient Communication
cd "Patient Communication Agent/patient_comm_app/out"
aws s3 sync . s3://healthcare-patient-communication --delete
```

### Step 6: Enable Static Website Hosting

```bash
# Enable website hosting for each bucket
aws s3 website s3://healthcare-clinical-copilot \
  --index-document index.html \
  --error-document index.html

aws s3 website s3://healthcare-prior-auth \
  --index-document index.html \
  --error-document index.html

aws s3 website s3://healthcare-medication-safety \
  --index-document index.html \
  --error-document index.html

aws s3 website s3://healthcare-patient-communication \
  --index-document index.html \
  --error-document index.html
```

### Step 7: Set Bucket Policies (Make Public)

**Create policy file: bucket-policy.json**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::BUCKET-NAME/*"
    }
  ]
}
```

**Apply to each bucket:**
```bash
# Replace BUCKET-NAME in policy file, then:
aws s3api put-bucket-policy \
  --bucket healthcare-clinical-copilot \
  --policy file://bucket-policy.json

aws s3api put-bucket-policy \
  --bucket healthcare-prior-auth \
  --policy file://bucket-policy.json

aws s3api put-bucket-policy \
  --bucket healthcare-medication-safety \
  --policy file://bucket-policy.json

aws s3api put-bucket-policy \
  --bucket healthcare-patient-communication \
  --policy file://bucket-policy.json
```

### Step 8: Get S3 Website URLs

Your applications are now accessible at:
```
http://healthcare-clinical-copilot.s3-website-us-east-1.amazonaws.com
http://healthcare-prior-auth.s3-website-us-east-1.amazonaws.com
http://healthcare-medication-safety.s3-website-us-east-1.amazonaws.com
http://healthcare-patient-communication.s3-website-us-east-1.amazonaws.com
```

---

## PART 2: EC2 DEPLOYMENT (Backend APIs)

### Step 9: Launch EC2 Instance

**Via AWS Console:**

1. Go to **EC2 Dashboard** → **Launch Instance**

2. **Configure:**
   - **Name:** healthcare-llm-backend
   - **AMI:** Amazon Linux 2023
   - **Instance Type:** t3.medium
   - **Key Pair:** Create new or select existing
   - **Storage:** 30 GB gp3

3. **Network Settings:**
   - Create security group: `healthcare-llm-sg`
   - Add rules:
     - SSH (22) - Your IP
     - HTTP (80) - 0.0.0.0/0
     - HTTPS (443) - 0.0.0.0/0
     - Custom TCP (3000) - 0.0.0.0/0
     - Custom TCP (3001) - 0.0.0.0/0
     - Custom TCP (3005) - 0.0.0.0/0
     - Custom TCP (3006) - 0.0.0.0/0

4. **Launch Instance**

5. **Note your EC2 Public DNS:** `ec2-xx-xx-xx-xx.compute-1.amazonaws.com`

### Step 10: Connect to EC2

```bash
# Windows (use Git Bash or PowerShell)
ssh -i "your-key.pem" ec2-user@your-ec2-public-dns
```

### Step 11: Setup EC2 Environment

```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify
node --version  # Should be v18.x or higher
npm --version

# Install PM2
sudo npm install -g pm2

# Create app directory
sudo mkdir -p /var/www/healthcare-llm
sudo chown -R $USER:$USER /var/www/healthcare-llm
```

### Step 12: Transfer Application Files to EC2

**From your local machine (Windows):**

```bash
# Navigate to your project folder
cd "D:\HealthCare LLM"

# Transfer each application
scp -i "your-key.pem" -r "AI Clinical Co-Pilot" ec2-user@your-ec2-dns:/var/www/healthcare-llm/

scp -i "your-key.pem" -r "Prior Authorization Automation" ec2-user@your-ec2-dns:/var/www/healthcare-llm/

scp -i "your-key.pem" -r "Medication Safety Assistant" ec2-user@your-ec2-dns:/var/www/healthcare-llm/

scp -i "your-key.pem" -r "Patient Communication Agent" ec2-user@your-ec2-dns:/var/www/healthcare-llm/
```

### Step 13: Start Backend APIs on EC2

**On EC2 instance:**

```bash
cd /var/www/healthcare-llm

# Start AI Clinical Co-Pilot API
cd "AI Clinical Co-Pilot"
npm install --production
pm2 start npm --name "clinical-copilot-api" -- start

# Start Prior Authorization API
cd "../Prior Authorization Automation/ai_pa_full_modules/frontend"
npm install --production
PORT=3001 pm2 start npm --name "prior-auth-api" -- start

# Start Medication Safety API
cd "../../../Medication Safety Assistant/med_safety_app"
npm install --production
PORT=3005 pm2 start npm --name "medication-safety-api" -- start

# Start Patient Communication API
cd "../../Patient Communication Agent/patient_comm_app"
npm install --production
PORT=3006 pm2 start npm --name "patient-communication-api" -- start

# Save PM2 configuration
cd /var/www/healthcare-llm
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command that PM2 outputs
```

### Step 14: Verify EC2 APIs are Running

```bash
# Check PM2 status
pm2 list

# Test APIs locally
curl http://localhost:3000
curl http://localhost:3001
curl http://localhost:3005
curl http://localhost:3006

# Test from outside (use your EC2 public DNS)
curl http://your-ec2-public-dns:3000
```

---

## PART 3: CONNECT S3 FRONTEND TO EC2 BACKEND

### Step 15: Update Frontend API Endpoints

Your S3 static files need to call EC2 APIs. Update the API base URL in your frontend code:

**Create environment configuration:**

For each app, create `.env.production`:
```
NEXT_PUBLIC_API_URL=http://your-ec2-public-dns:3000
```

**Rebuild and re-upload to S3:**
```bash
# Rebuild with production env
npm run build
npm run export

# Re-upload to S3
aws s3 sync ./out s3://your-bucket-name --delete
```

### Step 16: Configure CORS on EC2

Your EC2 APIs need to allow requests from S3 domains.

**Add CORS middleware to each Next.js app:**

Create `middleware.ts` in each app:
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

export const config = {
  matcher: '/api/:path*',
}
```

**Restart PM2:**
```bash
pm2 restart all
```

---

## PART 4: TESTING

### Step 17: Test Complete Flow

1. **Open S3 Website URL in browser:**
   ```
   http://healthcare-clinical-copilot.s3-website-us-east-1.amazonaws.com
   ```

2. **Verify:**
   - Page loads correctly
   - UI is responsive
   - API calls work (check browser console)
   - Data is returned from EC2 backend

3. **Test all 4 applications**

---

## PART 5: OPTIONAL ENHANCEMENTS

### Step 18: Add CloudFront (HTTPS + CDN)

**Why:** S3 website hosting only supports HTTP. CloudFront adds HTTPS.

```bash
# Create CloudFront distribution via AWS Console
# Point origin to S3 website endpoint
# Enable HTTPS
# Get CloudFront domain: d1234567890.cloudfront.net
```

### Step 19: Add Custom Domain (Route 53)

```bash
# Create hosted zone in Route 53
# Add A record pointing to CloudFront
# Update SSL certificate in CloudFront
```

### Step 20: Add Application Load Balancer for EC2

```bash
# Create ALB in EC2 console
# Add target groups for each port (3000, 3001, 3005, 3006)
# Configure health checks
# Update frontend to use ALB DNS instead of EC2 DNS
```

---

## SUMMARY OF URLS

### S3 Static Websites (Frontend)
```
Clinical Co-Pilot: http://healthcare-clinical-copilot.s3-website-us-east-1.amazonaws.com
Prior Auth: http://healthcare-prior-auth.s3-website-us-east-1.amazonaws.com
Medication Safety: http://healthcare-medication-safety.s3-website-us-east-1.amazonaws.com
Patient Communication: http://healthcare-patient-communication.s3-website-us-east-1.amazonaws.com
```

### EC2 Backend APIs
```
Clinical Co-Pilot API: http://your-ec2-dns:3000/api/*
Prior Auth API: http://your-ec2-dns:3001/api/*
Medication Safety API: http://your-ec2-dns:3005/api/*
Patient Communication API: http://your-ec2-dns:3006/api/*
```

---

## COST BREAKDOWN

### S3 Costs
- Storage: $0.023 per GB/month (~$0.50 for 20 GB)
- Requests: $0.0004 per 1,000 GET requests
- Data Transfer: $0.09 per GB (first 10 TB)
- **Estimated: $2-5/month**

### EC2 Costs
- t3.medium: $0.0416/hour = ~$30/month
- EBS 30 GB: ~$3/month
- Data Transfer: ~$5-10/month
- **Estimated: $38-43/month**

### Total: ~$40-48/month

---

## TROUBLESHOOTING

### S3 Issues
**403 Forbidden:**
- Check bucket policy allows public read
- Verify bucket policy JSON is correct

**404 Not Found:**
- Verify files uploaded: `aws s3 ls s3://your-bucket-name`
- Check index.html exists

### EC2 Issues
**Can't connect via SSH:**
- Check security group allows port 22 from your IP
- Verify key permissions: `chmod 400 your-key.pem`

**APIs not responding:**
- Check PM2: `pm2 list`
- Check logs: `pm2 logs`
- Verify security group allows ports 3000-3006

### CORS Issues
**API calls failing from S3:**
- Check browser console for CORS errors
- Verify CORS middleware added to EC2 apps
- Restart PM2: `pm2 restart all`

---

## NEXT STEPS

1. ✅ Deploy static files to S3
2. ✅ Deploy backend APIs to EC2
3. ✅ Connect frontend to backend
4. ⏭️ Add CloudFront for HTTPS
5. ⏭️ Add custom domain
6. ⏭️ Setup monitoring
7. ⏭️ Implement backups
8. ⏭️ Security hardening

---

**You now have a complete S3 + EC2 deployment following your architecture guide!**
