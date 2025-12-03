# Step-by-Step AWS Deployment Guide

## Prerequisites
- [ ] AWS Account with admin access
- [ ] AWS CLI installed and configured (`aws configure`)
- [ ] Node.js 18+ installed locally
- [ ] SSH key pair created in AWS EC2

---

## STEP 1: Launch EC2 Instance

### 1.1 Via AWS Console
1. Go to EC2 Dashboard → Launch Instance
2. **Name:** healthcare-llm-backend
3. **AMI:** Amazon Linux 2023 or Ubuntu 22.04
4. **Instance Type:** t3.medium (2 vCPU, 4 GB RAM) - minimum
5. **Key Pair:** Select or create new key pair
6. **Network Settings:**
   - Create security group: healthcare-llm-sg
   - Allow SSH (22) from your IP
   - Allow HTTP (80) from anywhere
   - Allow Custom TCP (3000, 3001, 3005, 3006) from anywhere
7. **Storage:** 30 GB gp3
8. Click **Launch Instance**

### 1.2 Note Your EC2 Details
```
Public IPv4: ___________________
Public DNS: ___________________
Key Pair: ___________________
```

---

## STEP 2: Connect to EC2 and Setup Environment

### 2.1 Connect via SSH
```bash
# Windows (use Git Bash or PowerShell)
ssh -i "your-key.pem" ec2-user@your-ec2-public-dns

# If using Ubuntu AMI, use:
ssh -i "your-key.pem" ubuntu@your-ec2-public-dns
```

### 2.2 Run Setup Script
```bash
# Copy the 3_ec2_setup.sh script to EC2
# Then run:
chmod +x 3_ec2_setup.sh
./3_ec2_setup.sh
```

---

## STEP 3: Transfer Application Files to EC2

### Option A: Using SCP (from your local machine)
```bash
# Compress applications
cd "D:\HealthCare LLM"
tar -czf healthcare-apps.tar.gz "AI Clinical Co-Pilot" "Prior Authorization Automation" "Medication Safety Assistant" "Patient Communication Agent"

# Transfer to EC2
scp -i "your-key.pem" healthcare-apps.tar.gz ec2-user@your-ec2-dns:/var/www/healthcare-llm/

# On EC2, extract
ssh -i "your-key.pem" ec2-user@your-ec2-dns
cd /var/www/healthcare-llm
tar -xzf healthcare-apps.tar.gz
```

### Option B: Using Git (if you have a repository)
```bash
# On EC2
cd /var/www/healthcare-llm
git clone your-repository-url .
```

---

## STEP 4: Start Applications with PM2

### 4.1 Run PM2 Startup Script
```bash
# On EC2
cd /var/www/healthcare-llm
chmod +x 4_start_apps_pm2.sh
./4_start_apps_pm2.sh
```

### 4.2 Verify Applications
```bash
pm2 list
pm2 logs
```

### 4.3 Test Endpoints
```bash
curl http://localhost:3000
curl http://localhost:3001
curl http://localhost:3005
curl http://localhost:3006
```

---

## STEP 5: Configure Security Group

### 5.1 Add Inbound Rules
Go to EC2 → Security Groups → healthcare-llm-sg → Edit Inbound Rules

Add these rules:
```
Type            Protocol    Port Range    Source
SSH             TCP         22            Your IP
HTTP            TCP         80            0.0.0.0/0
Custom TCP      TCP         3000          0.0.0.0/0
Custom TCP      TCP         3001          0.0.0.0/0
Custom TCP      TCP         3005          0.0.0.0/0
Custom TCP      TCP         3006          0.0.0.0/0
```

---

## STEP 6: Test Your Applications

Access via browser:
```
http://your-ec2-public-dns:3000  (AI Clinical Co-Pilot)
http://your-ec2-public-dns:3001  (Prior Authorization)
http://your-ec2-public-dns:3005  (Medication Safety)
http://your-ec2-public-dns:3006  (Patient Communication)
```

---

## STEP 7: Optional - Setup Nginx Reverse Proxy

### 7.1 Install Nginx
```bash
# Amazon Linux
sudo yum install -y nginx

# Ubuntu
sudo apt-get install -y nginx
```

### 7.2 Configure Nginx
```bash
sudo cp 5_nginx_config.conf /etc/nginx/conf.d/healthcare-llm.conf
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 7.3 Update Security Group
- Remove ports 3000, 3001, 3005, 3006 from public access
- Keep only port 80 (HTTP) open

---

## STEP 8: Optional - Add Domain Name (Route 53)

### 8.1 Create Hosted Zone
1. Go to Route 53 → Hosted Zones → Create
2. Enter your domain name
3. Note the nameservers

### 8.2 Create A Records
```
clinical-copilot.yourdomain.com → EC2 Public IP
prior-auth.yourdomain.com → EC2 Public IP
medication-safety.yourdomain.com → EC2 Public IP
patient-communication.yourdomain.com → EC2 Public IP
```

---

## STEP 9: Optional - Add HTTPS (Let's Encrypt)

```bash
# Install Certbot
sudo yum install -y certbot python3-certbot-nginx  # Amazon Linux
sudo apt-get install -y certbot python3-certbot-nginx  # Ubuntu

# Get certificates
sudo certbot --nginx -d clinical-copilot.yourdomain.com
sudo certbot --nginx -d prior-auth.yourdomain.com
sudo certbot --nginx -d medication-safety.yourdomain.com
sudo certbot --nginx -d patient-communication.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## STEP 10: Monitoring and Maintenance

### 10.1 PM2 Commands
```bash
pm2 list                    # List all processes
pm2 logs                    # View logs
pm2 restart all             # Restart all apps
pm2 stop all                # Stop all apps
pm2 delete all              # Remove all apps
pm2 monit                   # Monitor resources
```

### 10.2 Check Application Health
```bash
pm2 status
pm2 logs clinical-copilot
pm2 logs prior-auth
pm2 logs medication-safety
pm2 logs patient-communication
```

### 10.3 Update Applications
```bash
cd /var/www/healthcare-llm
git pull  # If using Git
pm2 restart all
```

---

## Troubleshooting

### Applications won't start
```bash
# Check logs
pm2 logs

# Check if ports are in use
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :3001

# Restart PM2
pm2 kill
pm2 resurrect
```

### Can't access from browser
- Check Security Group rules
- Verify EC2 instance is running
- Check if applications are running: `pm2 list`
- Test locally on EC2: `curl http://localhost:3000`

### High memory usage
- Upgrade to larger instance (t3.large or t3.xlarge)
- Monitor with: `pm2 monit`
- Check logs for errors

---

## Cost Optimization

### Development/Testing
- Use t3.micro or t3.small
- Stop instance when not in use
- Use Reserved Instances for long-term

### Production
- Use t3.medium or larger
- Enable Auto Scaling
- Use Application Load Balancer
- Implement CloudWatch monitoring

---

## Security Checklist

- [ ] Change default SSH port
- [ ] Disable root login
- [ ] Enable AWS CloudTrail
- [ ] Setup CloudWatch alarms
- [ ] Regular security updates
- [ ] Implement WAF rules
- [ ] Enable VPC Flow Logs
- [ ] Use IAM roles instead of access keys
- [ ] Enable encryption at rest
- [ ] Regular backups (AMI snapshots)

---

## Next Steps for Production

1. **Load Balancer:** Add Application Load Balancer
2. **Auto Scaling:** Configure Auto Scaling Groups
3. **Database:** Add RDS for data persistence
4. **CDN:** Add CloudFront for better performance
5. **Monitoring:** Setup CloudWatch dashboards
6. **Backup:** Automated EBS snapshots
7. **CI/CD:** Setup CodePipeline for deployments
8. **HIPAA:** Implement HIPAA compliance measures

---

## Support

For issues or questions:
1. Check PM2 logs: `pm2 logs`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Check system logs: `sudo journalctl -xe`
4. Review AWS CloudWatch logs
