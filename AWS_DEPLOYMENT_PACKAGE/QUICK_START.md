# Quick Start - AWS Deployment

## Fastest Way to Deploy (EC2 Only Approach)

Since your Next.js apps have API routes, the simplest deployment is **EC2 only** (no S3 needed).

### 5-Minute Deployment

#### 1. Launch EC2 Instance
```
Instance Type: t3.medium
AMI: Amazon Linux 2023
Storage: 30 GB
Security Group: Allow ports 22, 80, 3000, 3001, 3005, 3006
```

#### 2. Connect and Setup
```bash
ssh -i your-key.pem ec2-user@your-ec2-dns

# Install Node.js and PM2
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
sudo npm install -g pm2

# Create directory
sudo mkdir -p /var/www/healthcare-llm
sudo chown -R $USER:$USER /var/www/healthcare-llm
```

#### 3. Transfer Your Apps
```bash
# From your local machine
cd "D:\HealthCare LLM"
scp -i your-key.pem -r "AI Clinical Co-Pilot" ec2-user@your-ec2-dns:/var/www/healthcare-llm/
scp -i your-key.pem -r "Prior Authorization Automation" ec2-user@your-ec2-dns:/var/www/healthcare-llm/
scp -i your-key.pem -r "Medication Safety Assistant" ec2-user@your-ec2-dns:/var/www/healthcare-llm/
scp -i your-key.pem -r "Patient Communication Agent" ec2-user@your-ec2-dns:/var/www/healthcare-llm/
```

#### 4. Start Applications
```bash
# On EC2
cd /var/www/healthcare-llm

# AI Clinical Co-Pilot
cd "AI Clinical Co-Pilot"
npm install
pm2 start npm --name "clinical-copilot" -- start

# Prior Authorization
cd "../Prior Authorization Automation/ai_pa_full_modules/frontend"
npm install
PORT=3001 pm2 start npm --name "prior-auth" -- start

# Medication Safety
cd "../../../Medication Safety Assistant/med_safety_app"
npm install
PORT=3005 pm2 start npm --name "medication-safety" -- start

# Patient Communication
cd "../../Patient Communication Agent/patient_comm_app"
npm install
PORT=3006 pm2 start npm --name "patient-communication" -- start

# Save PM2 config
pm2 save
pm2 startup
```

#### 5. Access Your Apps
```
http://your-ec2-public-dns:3000  → AI Clinical Co-Pilot
http://your-ec2-public-dns:3001  → Prior Authorization
http://your-ec2-public-dns:3005  → Medication Safety
http://your-ec2-public-dns:3006  → Patient Communication
```

---

## Why EC2 Only?

Your applications use Next.js with API routes (`/api/*`), which require:
- Server-side execution
- Node.js runtime
- Dynamic request handling

**S3 cannot run these** - it only serves static files.

### Architecture
```
User Browser → EC2 (Next.js apps with built-in API routes)
```

This is simpler than:
```
User Browser → S3 (static) → EC2 (API only)
```

---

## Cost Estimate

**EC2 t3.medium (24/7):**
- Instance: ~$30/month
- Storage (30 GB): ~$3/month
- Data Transfer: ~$5-10/month
- **Total: ~$38-43/month**

**To reduce costs:**
- Use t3.small: ~$15/month (may be slower)
- Stop instance when not in use
- Use Reserved Instance: Save 30-40%

---

## Production Enhancements

Once basic deployment works, add:

1. **Domain Name** (Route 53)
2. **HTTPS** (Let's Encrypt/ACM)
3. **Nginx** (reverse proxy)
4. **Load Balancer** (ALB)
5. **Auto Scaling**
6. **CloudWatch** (monitoring)
7. **RDS** (database if needed)

---

## Troubleshooting

**Can't connect to EC2:**
- Check Security Group allows your IP on port 22
- Verify key pair permissions: `chmod 400 your-key.pem`

**Apps won't start:**
- Check Node.js version: `node --version` (should be 18+)
- Check logs: `pm2 logs`
- Verify ports aren't in use: `sudo netstat -tulpn`

**Can't access from browser:**
- Check Security Group allows ports 3000, 3001, 3005, 3006
- Verify apps are running: `pm2 list`
- Test locally: `curl http://localhost:3000`

---

## Next Steps

See `STEP_BY_STEP_DEPLOYMENT.md` for detailed instructions including:
- Nginx configuration
- Domain setup
- HTTPS/SSL
- Monitoring
- Backups
- Security hardening
