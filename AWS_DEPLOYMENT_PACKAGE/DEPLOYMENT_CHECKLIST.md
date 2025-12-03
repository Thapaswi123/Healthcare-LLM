# AWS Deployment Checklist

## Pre-Deployment
- [ ] AWS account created and verified
- [ ] AWS CLI installed: `aws --version`
- [ ] AWS CLI configured: `aws configure`
- [ ] SSH key pair created in EC2 console
- [ ] Key pair downloaded (.pem file)
- [ ] Key permissions set: `chmod 400 your-key.pem` (Linux/Mac)
- [ ] Node.js 18+ installed locally
- [ ] All applications tested locally

## EC2 Instance Setup
- [ ] EC2 instance launched (t3.medium recommended)
- [ ] Amazon Linux 2023 or Ubuntu 22.04 AMI selected
- [ ] 30 GB storage allocated
- [ ] Security group created: healthcare-llm-sg
- [ ] Security group rules configured:
  - [ ] Port 22 (SSH) - Your IP only
  - [ ] Port 80 (HTTP) - 0.0.0.0/0
  - [ ] Port 3000 (Clinical Co-Pilot) - 0.0.0.0/0
  - [ ] Port 3001 (Prior Auth) - 0.0.0.0/0
  - [ ] Port 3005 (Medication Safety) - 0.0.0.0/0
  - [ ] Port 3006 (Patient Communication) - 0.0.0.0/0
- [ ] Elastic IP allocated (optional but recommended)
- [ ] Instance tagged appropriately

## EC2 Connection
- [ ] SSH connection successful
- [ ] System updated: `sudo yum update -y`
- [ ] Node.js 18+ installed
- [ ] PM2 installed globally: `sudo npm install -g pm2`
- [ ] Git installed (if using Git deployment)
- [ ] Application directory created: `/var/www/healthcare-llm`
- [ ] Correct permissions set on directory

## Application Deployment
- [ ] AI Clinical Co-Pilot files transferred
- [ ] Prior Authorization files transferred
- [ ] Medication Safety files transferred
- [ ] Patient Communication files transferred
- [ ] Dependencies installed in each app: `npm install`
- [ ] Build completed (if required): `npm run build`

## PM2 Configuration
- [ ] AI Clinical Co-Pilot started on port 3000
- [ ] Prior Authorization started on port 3001
- [ ] Medication Safety started on port 3005
- [ ] Patient Communication started on port 3006
- [ ] All processes showing as "online": `pm2 list`
- [ ] PM2 configuration saved: `pm2 save`
- [ ] PM2 startup configured: `pm2 startup`
- [ ] Startup command executed (copy from PM2 output)

## Testing
- [ ] Local test on EC2: `curl http://localhost:3000`
- [ ] Local test on EC2: `curl http://localhost:3001`
- [ ] Local test on EC2: `curl http://localhost:3005`
- [ ] Local test on EC2: `curl http://localhost:3006`
- [ ] Browser test: `http://ec2-public-dns:3000`
- [ ] Browser test: `http://ec2-public-dns:3001`
- [ ] Browser test: `http://ec2-public-dns:3005`
- [ ] Browser test: `http://ec2-public-dns:3006`
- [ ] All features working correctly
- [ ] API endpoints responding
- [ ] No console errors

## Optional: Nginx Setup
- [ ] Nginx installed
- [ ] Configuration file created
- [ ] Nginx configuration tested: `sudo nginx -t`
- [ ] Nginx restarted: `sudo systemctl restart nginx`
- [ ] Nginx enabled on boot: `sudo systemctl enable nginx`
- [ ] Applications accessible through Nginx

## Optional: Domain Configuration
- [ ] Domain purchased/available
- [ ] Route 53 hosted zone created
- [ ] A records created for each subdomain
- [ ] DNS propagation verified
- [ ] Applications accessible via domain names

## Optional: HTTPS/SSL
- [ ] Certbot installed
- [ ] SSL certificates obtained
- [ ] Certificates auto-renewal configured
- [ ] HTTPS working for all domains
- [ ] HTTP to HTTPS redirect configured

## Monitoring & Maintenance
- [ ] CloudWatch agent installed (optional)
- [ ] CloudWatch alarms configured (optional)
- [ ] PM2 monitoring: `pm2 monit`
- [ ] Log rotation configured
- [ ] Backup strategy defined
- [ ] AMI snapshot created

## Security Hardening
- [ ] SSH port changed from 22 (optional)
- [ ] Root login disabled
- [ ] Firewall configured (ufw/firewalld)
- [ ] Fail2ban installed (optional)
- [ ] Security updates automated
- [ ] IAM roles configured (instead of access keys)
- [ ] VPC properly configured
- [ ] Security group rules minimized

## Documentation
- [ ] EC2 instance details documented
- [ ] Public IP/DNS recorded
- [ ] Domain names recorded
- [ ] SSH key location documented
- [ ] PM2 process names documented
- [ ] Deployment procedure documented
- [ ] Rollback procedure documented

## Cost Optimization
- [ ] Instance type appropriate for load
- [ ] Unused resources terminated
- [ ] Reserved Instance considered (for long-term)
- [ ] Auto Scaling configured (for production)
- [ ] CloudWatch billing alerts set up

## Production Readiness (if applicable)
- [ ] Load balancer configured
- [ ] Auto Scaling group created
- [ ] RDS database configured (if needed)
- [ ] S3 buckets for static assets (if needed)
- [ ] CloudFront distribution (if needed)
- [ ] WAF rules configured
- [ ] DDoS protection enabled
- [ ] Backup and disaster recovery plan
- [ ] HIPAA compliance measures implemented
- [ ] Penetration testing completed
- [ ] Load testing completed
- [ ] Monitoring dashboards created
- [ ] Incident response plan documented

## Post-Deployment
- [ ] All stakeholders notified
- [ ] User documentation updated
- [ ] Support team trained
- [ ] Monitoring alerts configured
- [ ] Regular maintenance scheduled

---

## Quick Reference

### EC2 Public Details
```
Public IPv4: _______________________
Public DNS: _______________________
Elastic IP: _______________________
```

### Application URLs
```
Clinical Co-Pilot: http://_______________________:3000
Prior Auth: http://_______________________:3001
Medication Safety: http://_______________________:3005
Patient Communication: http://_______________________:3006
```

### Domain Names (if configured)
```
Clinical Co-Pilot: https://_______________________
Prior Auth: https://_______________________
Medication Safety: https://_______________________
Patient Communication: https://_______________________
```

### Key Files Location
```
SSH Key: _______________________
PM2 Config: /home/ec2-user/.pm2/
Nginx Config: /etc/nginx/conf.d/
Application Logs: /var/www/healthcare-llm/
```

### Important Commands
```bash
# Check PM2 status
pm2 list
pm2 logs

# Restart applications
pm2 restart all

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check system resources
htop
df -h
free -m
```

---

## Troubleshooting Checklist

If something doesn't work:
- [ ] Check PM2 status: `pm2 list`
- [ ] Check PM2 logs: `pm2 logs`
- [ ] Check if ports are listening: `sudo netstat -tulpn`
- [ ] Check Security Group rules
- [ ] Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- [ ] Check system logs: `sudo journalctl -xe`
- [ ] Verify Node.js version: `node --version`
- [ ] Check disk space: `df -h`
- [ ] Check memory: `free -m`
- [ ] Restart services: `pm2 restart all`
